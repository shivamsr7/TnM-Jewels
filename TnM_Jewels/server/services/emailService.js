import { Resend } from "resend";
import { orderConfirmationEmail } from "../templates/orderConfirmationEmail.js";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendOrderConfirmation(order) {
  try {
    console.log("Inside sendOrderConfirmation");
const result = await resend.emails.send({
  from: "T&M Jewels <onboarding@resend.dev>",
  to: order.customer_email,
  subject: `✨ Your Order ${order.order_number} is Confirmed`,
  html: orderConfirmationEmail({
    customerName: order.customer_name,
    orderNumber: order.order_number,
    paymentMethod: order.payment_method,
    total: order.total,
    items: order.items,
  }),
});

console.log("Resend Result:", result);

  } catch (err) {
    console.error("Email Error:", err);
  }
}
export default resend;