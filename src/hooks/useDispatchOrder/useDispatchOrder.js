import { useMutation } from "@tanstack/react-query";
import { useApp } from "../../context/AppContext";

export const dispatchOrder = async ({ order, token }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data?.message || "You order has failed. Please try again later."
    );
    error.data = data?.errors || data?.error || data;
    throw error;
  }

  return data;
};

export const useDispatchOrder = (onSuccess, onError) => {
  const {
    state: { token },
  } = useApp();

  return useMutation({
    mutationFn: (order) => dispatchOrder({ order, token }),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
