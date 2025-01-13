import { z } from 'zod';
import { db } from '../../db';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const categoryRouter = createTRPCRouter({
  // Fetch all categories
  getAllCategories: publicProcedure.query(async () => {
    return db.category.findMany();
  }),

  // Fetch products by category ID
  getProductsByCategory: publicProcedure
    .input(
      z.object({
        categoryId: z.number(),
      }),
    )
    .query(async ({ input }) => {
      return db.product.findMany({
        where: {
          categories: {
            some: {
              id: input.categoryId,
            },
          },
        },
        include: {
          categories: true,
        },
      });
    }),

  // Fetch multiple categories by ID list
  getCategoriesByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.number()),
      }),
    )
    .query(async ({ input }) => {
      return db.category.findMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),
});
