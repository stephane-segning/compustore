import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export const cart = createTRPCRouter({
  getCart:  protectedProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      if (ctx.session?.user?.id) { 
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You must be logged in to view your cart.',
        });
      }
      const { userId } = input;
      return db.cart.findUnique({
        where: { userId: input.userId },
        include: {
          items: {
            include: {
              product: {
                select: { name: true, prices: true },
              },
            },
          },
        },
      });
    }),
  addToCart:  protectedProcedure
    .input(z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to add items to your cart.',
        });
      }
      const { productId, quantity } = input;

      const cart = await ctx.db.cart.findUnique({
        where: { userId: ctx.session?.user?.id },
      });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const existingCartItem = await ctx.db.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      if (existingCartItem) {
        await ctx.db.cartItem.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
      } else {
        const product = await ctx.db.product.findUnique({
          where: { id: productId },
          select: { prices: true },
        });

        if (!product || !product.prices.length) {
          throw new Error('Product not found or has no prices');
        }

        const price = product.prices[0]?.price;
        if (typeof price !== 'number') {
          throw new Error('Invalid price for the product');
        }

        await ctx.db.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            price: price,
          },
        });
      }

      return { success: true };
    }),

  updateCart:  protectedProcedure
    .input(z.object({
      itemId: z.string(), quantity: z.number().min(1),
    }))
    .mutation(async ({ input, ctx }) => {

      const cartItem = await db.cartItem.findUnique({
        where: { id: input.itemId },
        include: { cart: true },
      });
      if (cartItem?.cart?.userId !== ctx.session?.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update items in your own cart.',
        });
      }
      const { itemId, quantity } = input;

      await db.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });

      return { success: true };
    }),
  
    removeFromCart: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const cartItem = await db.cartItem.findUnique({
        where: { id: input.itemId },
        include: { cart: true },
      });
      if (cartItem?.cart?.userId !== ctx.session?.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only remove items from your own cart.',
        });
      }
      await db.cartItem.delete({ where: { id: input.itemId } });
      return { success: true };
    }),

  clearCart:  protectedProcedure
    .input(z.object({ userId: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session?.user?.id !== input.userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only clear your own cart.',
        });
      }
      const { userId } = input;

      const cart = await db.cart.findUnique({ where: { userId } });
      if (!cart) {
        // Cart not found, nothing to clear
        return { success: true };
      }

      await db.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
      return { success: true };
    }),
});