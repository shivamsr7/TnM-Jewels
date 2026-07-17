const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getPaymentSettings() {
  const res = await fetch(`${API_URL}/api/payment-settings`);

  if (!res.ok) {
    throw new Error("Failed to load payment settings.");
  }

  const data = await res.json();

  return data.settings;
}