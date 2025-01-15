import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY as string, {
    apiVersion: '2024-12-18.acacia'
})

export default stripe