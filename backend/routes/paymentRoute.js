import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controller/paymentController.js";
import { isAuthenticatedUser } from "../middleware/authorization.js";

const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

export default router;
