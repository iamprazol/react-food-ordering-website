import { useMutation } from "@tanstack/react-query";

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
    error.data = data.error; // attach full error object here
    throw error;
  }
  localStorage.setItem("token", data.access_token);

  return data;
};

export const useRegisterUser = (onSuccess, onError) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess,
    onError: (error) => {
      onError?.(error);
    },
  });
};
