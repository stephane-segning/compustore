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
        // name: sanitizeHTML(product.name),
        // description: sanitizeHTML(product.description || ''),
      };
    }),
  // Fetch all products with pagination and custom includes
  getAllProducts: publicProcedure
    .input(
      z
        .object({
          page: z.number().min(1).default(1).optional(), // Default to page 1
          limit: z.number().min(1).max(30).default(10).optional(), // Default 10 items per page
          include: z
            .object({
              stocks: z.boolean().optional(),
              prices: z.boolean().optional(),
              images: z.boolean().optional(),
              variants: z.boolean().optional(),
            })
            .optional(), // Custom includes
        })
        .optional() // Make the entire input optional
    )
    .query(async ({ input }) => {
      // Extract input values or apply defaults
      const { page = 1, limit = 10, include } = input || {};

      // Calculate offset for pagination
      const skip = (page - 1) * limit;

      // Query database with dynamic includes and pagination
      const products = await db.product.findMany({
        skip,
        take: limit,
        include: {
          stocks: include?.stocks ?? false,
          prices: include?.prices ?? false,
          images: include?.images ?? false,
          variants: include?.variants ?? false,
        },
      });

      // Total count for pagination metadata
      const totalCount = await db.product.count();

      return {
        products,
        meta: {
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
        },
      };
    }),
});
