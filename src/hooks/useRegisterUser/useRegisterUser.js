import { useMutation } from "@tanstack/react-query";
import { useApp } from "../../context/AppContext";

const registerUser = async (user) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.message || "Registration failed");
    error.data = data?.errors || data?.error || data;
    throw error;
  }

  return data;
};

export const useRegisterUser = (onSuccess, onError) => {
  const { login } = useApp();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const token = data?.access_token || data?.success?.token;
      const user = data?.user || data?.success?.user;

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
