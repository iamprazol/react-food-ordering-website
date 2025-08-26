import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";

export async function dispatchOrder({ order, token }) {
  const base = process.env.REACT_APP_API_URL;
  if (!base) throw new Error("REACT_APP_API_URL is missing");
  if (!token) throw new Error("Auth token missing");

  let res;
  try {
    res = await fetch(`${base}/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(order),
    });
  } catch (netErr) {
    const e = new Error("Network error while creating order.");
    e.data = { original: netErr && netErr.message };
    throw e;
  }

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {}

  if (!res.ok) {
    const e = new Error(
      (data && (data.message || data.error)) || `Order failed (${res.status})`
    );
    e.data = (data && (data.errors || data.error)) || data || text;
    throw e;
  }

  return data;
}

export function useDispatchOrder(onSuccess, onError) {
  const {
    state: { token },
  } = useAuth();

  const mutation = useMutation({
    mutationFn: (order) => dispatchOrder({ order, token }),
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
