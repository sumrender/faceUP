import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Stripe from "stripe";
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.STRIPE_SECRET_API_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY);

export const processPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
      
  } catch (e) {
    console.log(e.message)
  }
});

export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
