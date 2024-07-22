import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  appInfo: {
    name: 'Webprodigies Cypress',
    version: '0.1.0',
  },
});