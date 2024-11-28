import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';

export const productRouter = createTRPCRouter({
  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await db.product.findUnique({
        where: { id: input.id },
        include: {
          stocks: true,
          prices: true,
          images: true,
          variants: true,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with ID ${input.id} not found.`,
        });
      }

      return product;
    }),
  getAllProducts: publicProcedure.query(async () => {
    const products = await db.product.findMany({
      include: {
        stocks: true,
        prices: true,
        images: true,
        variants: true,
      },
    });

    return products;
  }),
});
