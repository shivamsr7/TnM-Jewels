export default function OrderSummary({ order }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">

      <h3 className="mb-4 text-lg font-semibold">
        Order Summary
      </h3>

      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>₹{order?.subtotal}</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Shipping</span>
        <span>₹{order?.shipping_charge}</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Payment Method</span>
        <span>{order?.payment_method}</span>
      </div>

      <div className="flex justify-between border-t pt-4 text-xl font-bold">
        <span>Total</span>
        <span>₹{order?.total}</span>
      </div>

    </div>
  );
}