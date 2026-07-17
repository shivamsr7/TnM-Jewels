export default function OrderItems({ items }) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">
        Ordered Products
      </h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.product_name}
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {item.product_name}
                </h4>

                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>

                <p className="text-sm text-gray-400">
                  ₹{item.price} each
                </p>
              </div>
            </div>

            <div className="text-lg font-semibold">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}