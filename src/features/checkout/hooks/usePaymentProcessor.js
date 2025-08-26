import { useMutation } from "@tanstack/react-query";
import { useApp } from "../../../context/AppContext";
import { initiateStripePayment } from "./initaiteStripePayment";

const providers = {
  stripe: initiateStripePayment,
};

async function initiatePayment({ provider, order, token }) {
  const handler = providers[provider];
  if (!handler) throw new Error(`Unsupported payment provider: ${provider}`);
  return handler(order, token);
}

export function usePaymentProcessor(onSuccess, onError) {
  const {
    state: { token },
  } = useApp();

  const mutation = useMutation({
    mutationFn: ({ provider, order }) =>
      initiatePayment({ provider, order, token }),
    onSuccess: (data) => onSuccess && onSuccess(data),
    onError: (error) => onError && onError(error),
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  };
}
