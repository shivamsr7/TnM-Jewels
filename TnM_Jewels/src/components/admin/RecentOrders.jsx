import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/orders/recent"
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Recent Orders
        </h2>

        <Link
          to="/admin/orders"
          className="text-sm font-medium text-[#C8A45C] hover:underline"
        >
          View All →
        </Link>

      </div>

      {loading ? (

        <p>Loading...</p>

      ) : orders.length === 0 ? (

        <p className="text-gray-500">
          No orders found.
        </p>

      ) : (

        <div className="space-y-4">

          {orders.map((order) => (

            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A45C] text-sm font-bold text-white">

                  {order.customer_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}

                </div>

                <div>

                  <p className="font-semibold">
                    {order.order_number}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.customer_name}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  ₹{order.total}
                </p>

                <p
                  className={`text-sm ${
                    order.order_status === "Delivered"
                      ? "text-green-600"
                      : order.order_status === "Pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.order_status}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}