export async function initiateStripePayment(order, token) {
  const base = process.env.REACT_APP_API_URL;
  if (!base) throw new Error("REACT_APP_API_URL is missing");
  if (!token) throw new Error("Auth token missing");

  const res = await fetch(`${base}/payment-intent`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      total_price: order.total_price,
      paymentMethodId: order?.paymentIntent?.paymentMethodId,
      currency: order.currency || "inr",
    }),
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {}

  if (!res.ok || (data && data.error)) {
    const err = new Error(
      (data && (data.error || data.message)) || `Payment failed (${res.status})`
    );
    err.data = (data && (data.errors || data.error)) || data || text;
    throw err;
  }

  return data;
}
