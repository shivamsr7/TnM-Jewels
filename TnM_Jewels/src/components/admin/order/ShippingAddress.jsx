export default function ShippingAddress({ order }) {
  return (
    <div>

      <h3 className="mb-4 text-lg font-semibold">
        Shipping Address
      </h3>

      <div className="rounded-xl border p-5">

        <p>{order?.shipping_address}</p>

        <p className="mt-2 text-gray-600">
          {order?.city}, {order?.state}
        </p>

        <p>{order?.pincode}</p>

      </div>

    </div>
  );
}