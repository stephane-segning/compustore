import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../../db';

export const productRouter = createTRPCRouter({
  getProductById: publicProcedure
    .input(z.object({ id: z.number() }))
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
        throw new Error(`Product with ID ${input.id} not found.`);
      }

      return product;
    }),
});
