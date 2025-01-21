
import { NextResponse } from 'next/server';
import stripe from '@cps/server/stripe';
import { db } from '@cps/server/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, cartDetails } = body;

        // Validate cart details
        if (!userId || !cartDetails || cartDetails.items.length === 0) {
            return NextResponse.json({
                error: 'Invalid cart details'
            }, {
                status: 400
            });
        }

        // Calculate the total amount (in cents)
        const amount = cartDetails.items.reduce(
            (
                total: number,
                item: {
                    price: number;
                    quantity: number
                }) => total + item.price * item.quantity,
            0
        );

        // Create a payment intent via Stripe
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
                cartDetails: JSON.stringify(cartDetails),
                amount,
                status: 'pending',
            },
        });

        // Return the client secret and the payment session ID to the frontend
        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentSessionId: paymentSession.id,
        });

    } catch (error) {
        console.error('Error creating payment intent:', error);

        // Specific error handling for different types of errors
        if (error instanceof Error) {
            return NextResponse.json({
                error: error.message || 'Internal Server Error',
            }, {
                status: 500
            });
        }

        return NextResponse.json({
            error: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { paymentSessionId, paymentStatus } = body;

        // Validate the incoming data
        if (!paymentSessionId || !paymentStatus) {
            return NextResponse.json({
                error: 'Missing payment session ID or payment status'
            }, {
                status: 400
            });
        }

        // Find the payment session in the database
        const paymentSession = await db.paymentSession.findUnique({
            where: {
                id: paymentSessionId
            },
        });

        if (!paymentSession) {
            return NextResponse.json({
                error: 'Payment session not found'
            }, {
                status: 404
            });
        }

        // Update the payment status in the database
        const updatedPaymentSession = await db.paymentSession.update({
            where: {
                id: paymentSessionId
            },
            data: {
                status: paymentStatus,
                updatedAt: new Date(),
            },
        });

        // Respond with the updated payment session
        return NextResponse.json({
            paymentSession: updatedPaymentSession,
        });

    } catch (error) {
        console.error('Error updating payment status:', error);

        return NextResponse.json({
            error: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}
