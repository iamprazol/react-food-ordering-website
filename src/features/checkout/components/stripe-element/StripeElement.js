import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Box, FormControl, FormLabel, Button, Text } from "@chakra-ui/react";
import { useUserData } from "../../../../context/UserDataContext";

export default function StripeElement() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState({});
  const [cardState, setCardState] = useState({});
  const {
    state: { paymentIntent },
    dispatch,
  } = useUserData();

  const handleBlur = async (event, field) => {
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setMessage({
        type: "error",
        message: error.message,
      });
    } else {
      setCardState((prev) => ({ ...prev, paymentMethodId: paymentMethod.id }));
      setMessage({
        type: "success",
        message: "Card is valid, you can proceed.",
      });
    }
  };

  if (Object.keys(message).length > 0 && message.type === "success") {
    dispatch({
      type: "SET_PAYMENT_INTENT",
      payload: {
        paymentMode: "stripe",
        paymentMethodId: cardState.paymentMethodId,
      },
    });
  }

  const elementStyle = {
    base: {
      fontSize: "16px",
      color: "#000",
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "white", // background color
      padding: "10px",
    },
    invalid: {
      color: "#fa755a",
    },
  };

  return (
    <Box as="form" p={4}>
      <FormControl mb={4}>
        <FormLabel>Card Number</FormLabel>
        <Box p={2} borderWidth={1} borderRadius="md" bgColor={"white"}>
          <CardNumberElement
            options={{ style: elementStyle }}
            onBlur={(e) => handleBlur(e, "number")}
          />
        </Box>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Expiry</FormLabel>
        <Box p={2} borderWidth={1} borderRadius="md" bgColor={"white"}>
          <CardExpiryElement
            options={{ style: elementStyle }}
            onBlur={(e) => handleBlur(e, "expiry")}
          />
        </Box>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>CVC</FormLabel>
        <Box p={2} borderWidth={1} borderRadius="md" bgColor={"white"}>
          <CardCvcElement
            options={{ style: elementStyle }}
            onBlur={(e) => handleBlur(e, "cvc")}
          />
        </Box>
      </FormControl>

      {message && (
        <Text
          mt={1}
          color={message.type === "error" ? "red.500" : "green.500"}
          fontSize="14px"
          fontWeight="500"
        >
          {message.message}
        </Text>
      )}
    </Box>
  );
}
