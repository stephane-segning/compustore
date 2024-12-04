import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';
import DOMPurify from 'dompurify';

// Enhanced sanitizeHTML function
export const sanitizeHTML = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'p', 'span'],
    ALLOWED_ATTR: ['class', 'style'],
  });
};

export const productRouter = createTRPCRouter({
  getProductById: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(), // Validate that the ID is a valid CUID
      })
    )
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

      return {
        ...product,
        name: sanitizeHTML(product.name),
        description: sanitizeHTML(product.description || ''),
      };
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
