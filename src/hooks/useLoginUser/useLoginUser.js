// loginUser.js
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/auth-context";

// Core login function
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

  // Save token to localStorage (or cookies/context/etc.)
  if (data.success.token) {
    localStorage.setItem("token", data.success.token);
  }

  return data;
};

// React Query hook
export const useLoginUser = (onSuccess, onError) => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token = data?.success?.token;
      if (token) {
        login(token);
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
