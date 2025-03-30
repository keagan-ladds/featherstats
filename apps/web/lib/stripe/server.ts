import Stripe from "stripe"

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) throw new Error();

export const stripe = new Stripe(STRIPE_SECRET_KEY) ;