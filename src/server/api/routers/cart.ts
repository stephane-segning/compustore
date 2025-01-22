import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export const cart = createTRPCRouter({
  getCart:   publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ input }) => {
      const { userId } = input;
      return db.cart.findUnique({
        where: { userId },
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
  addToCart:   publicProcedure
    .input(z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
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

  updateCart:   publicProcedure
    .input(z.object({
      itemId: z.string(), quantity: z.number().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const { itemId, quantity } = input;

      await db.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });

      return { success: true };
    }),
  
    removeFromCart: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { itemId } = input;
      await ctx.db.cartItem.delete({
        where: { id: itemId },
      });
      return { success: true };
    }),

  clearCart:   publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .mutation(async ({ input }) => {
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