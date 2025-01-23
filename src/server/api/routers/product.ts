import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { db } from '../../db';
import { TRPCError } from '@trpc/server';
import DOMPurify from 'dompurify';
import  getServerSession  from 'next-auth';
import { authConfig } from '@cps/server/auth/config'; 

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
        })
        .optional(), // Make the entire input optional
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
          stocks: include?.stocks,
          prices: include?.prices,
          images: include?.images,
          variants: include?.variants,
          thumbnail: include?.thumbnail,
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
  
  
  // Create a new product (accessible only by ADMIN)
  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await getServerSession(authConfig);
      
      if (!session || (session as any).user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to create products.',
        });
      }

      const newProduct = await db.product.create({
        data: input,
      });

      return newProduct;
    }),

  // Update a product (accessible only by ADMIN)
  updateProduct: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await getServerSession(authConfig);
      
      if (!session || (session as any).user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to update this product.',
        });
      }

      const updatedProduct = await db.product.update({
        where: { id: input.id },
        data: input,
      });

      return updatedProduct;
    }),

  // Delete a product (accessible only by ADMIN)
  deleteProduct: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      const session = await getServerSession(authConfig);

      if (!session || (session as any).user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to delete this product.',
        });
      }

      const deletedProduct = await db.product.delete({
        where: { id: input.id },
      });

      return deletedProduct;
    }),
});