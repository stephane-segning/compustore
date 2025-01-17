import { NextResponse } from 'next/server';
import stripe from '@cps/server/stripe';
import { db } from '@cps/server/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, cartDetails } = body;

        // Validate cart details.
        if (!userId || !cartDetails || cartDetails.items.length === 0) {
            return NextResponse.json({
                error: 'Invalid cart details'
            }, {
                status: 400
            });
        }

        // Calculate the total amount.
        const amount = cartDetails.items.reduce(
            (
                total: number,
                item: any

            ) => total + item.price * item.quantity,
            0
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: {
                userId,
                cartId: cartDetails.id,
            },
        });

        // Storing Payment Session in the database
        const paymentSession = await db.paymentSession.create({
            data: {
                userId,
                paymentIntentId: paymentIntent.id,
                cartDetails,
                amount,
                status: 'pending',
            },
        });

        // Returning the client secret to the frontend
        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentSessionId: paymentSession.id,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json({
            error: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}
