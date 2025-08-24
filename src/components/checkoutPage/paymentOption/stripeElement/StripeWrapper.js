import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeElement from "./StripeElement";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <StripeElement />
    </Elements>
  );
}
