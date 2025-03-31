import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!STRIPE_PUBLISHABLE_KEY) throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY has not been defined");

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
