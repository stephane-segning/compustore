import { categoryRouter } from '@cps/server/api/routers/category'; //Import the category router
import { createCallerFactory, createTRPCRouter } from '@cps/server/api/trpc';
import { uploadRouter } from './routers/upload';
import { productRouter } from './routers/product';
import { cart } from '@cps/server/api/routers/cart';
import {paymentRouter} from "@cps/server/api/payment/route";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cart: cart,
  upload: uploadRouter,
  category: categoryRouter, // Add the category router
  product: productRouter,
  payment: paymentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);