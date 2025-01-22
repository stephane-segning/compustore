import { z } from "zod";
import { db } from '@cps/server/db';
import stripe from "@cps/server/stripe";
import { publicProcedure } from "@cps/server/api/trpc";
import { TRPCError } from '@trpc/server';

export const paymentRouter = ({

    // Create a payment session
    createPaymentSession: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                cartId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { userId, cartId } = input;

            // Fetch the user's cart and calculate the total amount
            const cart = await db.cart.findUnique({
                where: { id: cartId },
                include: { items: true },
            });

            if (!cart) {
                throw new TRPCError({ code: 'NOT_FOUND', message: "Cart not found" });
            }

            // Calculate total amount and convert to cents (Stripe expects cents)
            const amount = cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            const amountInCents = amount * 100; // Convert dollars to cents

            // Create a payment intent using Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInCents,
                currency: "usd",
                metadata: {
                    userId,
                    cartId,
                },
            });

            // Prepare cart details to be saved in the database
            const cartDetails = cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));

            // Use a database transaction to ensure consistency
            const paymentSession = await db.$transaction(async (tx) => {
                const session = await tx.paymentSession.create({
                    data: {
                        userId,
                        cartId,
                        paymentIntentId: paymentIntent.id,
                        cartDetails: JSON.stringify(cartDetails),
                        status: "pending",
                        amount: amountInCents,
                    },
                });

                if(!paymentSession){
                    throw new Error( "Payment session not found" )
                }

                if (!session) {
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Payment session creation failed' });
                }

                return session;
            });

            // Return the client secret to the frontend
            return {
                clientSecret: paymentIntent.client_secret,
            };
        }),

    // Update payment session status
    updatePaymentSession: publicProcedure
        .input(
            z.object({
                paymentIntentId: z.string(),
                status: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { paymentIntentId, status } = input;

            // Update the payment session status in the database
            const updatedSession = await db.paymentSession.update({
                where: { paymentIntentId },
                data: { status },
            });

            if (!updatedSession) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Payment session not found' });
            }

            return { success: true };
        }),

    // Retrieve payment status
    getPaymentStatus: publicProcedure
        .input(
            z.object({
                paymentIntentId: z.string(),
            })
        )
        .query(async ({ input }) => {
            const { paymentIntentId } = input;

            // Retrieve the payment session from the database
            const paymentSession = await db.paymentSession.findUnique({
                where: { paymentIntentId },
            });

            if (!paymentSession) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Payment session not found' });
            }

            return {
                status: paymentSession.status,
                amount: paymentSession.amount,
            };
        }),
});
