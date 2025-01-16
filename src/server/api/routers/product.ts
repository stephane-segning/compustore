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
      }),
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
              thumbnail: z.boolean().optional().default(false),
              stocks: z.boolean().optional().default(false),
              prices: z.boolean().optional().default(false),
              images: z.boolean().optional().default(false),
              variants: z.boolean().optional().default(false),
            })
            .optional(), // Custom includes
          category: z.string().optional(), // Add optional category filter
        })
        .optional(), // Make the entire input optional
    )
    .query(async ({ input }) => {
      try {
        // Extract input values or apply defaults
        const { page = 1, limit = 10, include, category } = input || {};

        // Calculate offset for pagination
        const skip = (page - 1) * limit;

        // Split the category filter into an array if provided
        const categoryFilter = category
          ? category.split(',').map((name) => name.trim())
          : [];

        // Query database with dynamic includes and pagination
        const products = await db.product.findMany({
          skip,
          take: limit,
          where: {
            ...(categoryFilter.length > 0 && {
              categories: {
                some: {
                  category: {
                    name: { in: categoryFilter }, // Use 'in' to match multiple categories
                  },
                },
              },
            }),
          },
          include: {
            stocks: include?.stocks,
            prices: include?.prices,
            images: include?.images,
            variants: include?.variants,
            thumbnail: include?.thumbnail,
          },
        });

        // Total count for pagination metadata
        const totalCount = await db.product.count({
          where: {
            ...(categoryFilter.length > 0 && {
              categories: {
                some: {
                  category: {
                    name: { in: categoryFilter },
                  },
                },
              },
            }),
          },
        });

        return {
          products,
          meta: {
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
          },
        };
      } catch (err) { 
        console.error('Error in getAllProducts:', err);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred while fetching products.',
        });
      }
    }),
});