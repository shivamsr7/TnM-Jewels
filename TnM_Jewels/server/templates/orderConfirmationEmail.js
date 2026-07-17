export function orderConfirmationEmail({
  customerName,
  orderNumber,
  paymentMethod,
  total,
  items,
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
      <h2 style="color:#C8A45C;">
        ✨ Thank you for shopping with T&M Jewels
      </h2>

      <p>Hi <strong>${customerName}</strong>,</p>

      <p>
        Your order has been placed successfully.
      </p>

      <hr/>

      <p><strong>Order Number:</strong> ${orderNumber}</p>

      <p><strong>Payment:</strong> ${paymentMethod}</p>

      <p><strong>Total:</strong> ₹${total}</p>

      <h3>Items</h3>

      <ul>
        ${items
          .map(
            (item) => `
            <li>
              ${item.product_name} × ${item.quantity}
            </li>
          `
          )
          .join("")}
      </ul>

      <hr/>

      <p>
        We'll notify you once your order has been shipped.
      </p>

      <p>
        Thanks for choosing
        <strong>T&M Jewels</strong> ❤️
      </p>
    </div>
  `;
}