import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { useUserData } from "../../../context/UserDataContext";

const loginUser = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.message || "Login failed");
    error.data = data?.errors || data;
    throw error;
  }

  return data;
};

export const useLoginUser = (onSuccess, onError) => {
  const { login } = useAuth();
  const { dispatch } = useUserData();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data?.success?.token;
      const address = data?.success?.address;
      const orders = data?.success?.orders;
      const favourites = data?.success?.favourites;
      const user = data?.user;

      if (token && user) {
        login(token, user);
      }

      dispatch({ type: "SET_ADDRESS", payload: address });
      dispatch({ type: "SET_ORDERS", payload: orders });
      dispatch({ type: "SET_FAVOURITES", payload: favourites });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
