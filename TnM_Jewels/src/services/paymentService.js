const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export async function createRazorpayOrder(amount) {
  const res = await fetch(
    `${API_URL}/api/payments/create-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.order;
}
export async function verifyPayment(paymentData) {

  const res = await fetch(
    `${API_URL}/api/payments/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
}