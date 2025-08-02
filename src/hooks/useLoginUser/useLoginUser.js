import { useMutation } from "@tanstack/react-query";
import { useApp } from "../../context/AppContext";

const loginUser = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
  const { login } = useApp();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data?.success?.token;
      const user = data?.user;

      if (token && user) {
        login(token, user);
      }

      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
