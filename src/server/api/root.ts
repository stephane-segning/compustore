import { postRouter } from '@cps/server/api/routers/post';
import { categoryRouter } from '@cps/server/api/routers/category'; //Import the category router
import { createCallerFactory, createTRPCRouter } from '@cps/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  category: categoryRouter, // Add the category router
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @exampleroot.ts
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
