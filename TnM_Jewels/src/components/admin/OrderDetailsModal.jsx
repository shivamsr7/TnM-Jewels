import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import StatusConfirmModal from "./StatusConfirmModal";
import CustomerInfo from "./order/CustomerInfo";
import ShippingAddress from "./order/ShippingAddress";
import OrderItems from "./order/OrderItems";
import OrderSummary from "./order/OrderSummary";
export default function OrderDetailsModal({
  open,
  order,
  items,
  onClose,
  loading,
  onStatusUpdate
}) {
    
  if (!open) return null;
  const [confirmOpen, setConfirmOpen] = useState(false);
const [status, setStatus] = useState("");

useEffect(() => {
  if (order) {
    setStatus(order.order_status);
  }
}, [order]);
  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              Order Details
            </h2>

            <p className="mt-1 text-gray-500">
              {order?.order_number}
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {loading ? (

          <div className="p-20 text-center">
            Loading...
          </div>

        ) : (

          <div className="space-y-8 p-6">

            {/* Customer */}

<CustomerInfo order={order} />

            {/* Address */}

<ShippingAddress order={order} />

            {/* Products */}

           <OrderItems items={items} />

            {/* Summary */}

<OrderSummary order={order} />

            <OrderTimeline currentStatus={status} />
<div className="rounded-2xl border p-6">

  <h3 className="mb-4 text-lg font-semibold">
    Order Status
  </h3>

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full rounded-xl border p-3 outline-none focus:border-[#C8A45C]"
  >

    <option>Pending</option>

    <option>Confirmed</option>

    <option>Packed</option>

    <option>Shipped</option>

    <option>Delivered</option>

    <option>Cancelled</option>

  </select>

</div>
<button
onClick={() => setConfirmOpen(true)}
  className="mt-5 w-full rounded-xl bg-[#C8A45C] py-3 font-semibold text-white transition hover:bg-black"
>
  Save Changes
</button>
<StatusConfirmModal
  open={confirmOpen}
  currentStatus={order?.order_status}
  newStatus={status}
  onCancel={() => setConfirmOpen(false)}
  onConfirm={async () => {
    await onStatusUpdate(order.id, status);
    setConfirmOpen(false);
  }}
/>
          </div>

        )}

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border p-4">

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>

    
  );
}
function OrderTimeline({ currentStatus }) {
  const steps = [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered",
  ];

 const currentIndex =
  currentStatus === "Cancelled"
    ? -1
    : steps.indexOf(currentStatus);

  return (
    <div className="rounded-2xl border p-6">

      <h3 className="mb-6 text-lg font-semibold">
        Order Progress
      </h3>
{currentStatus === "Cancelled" && (
  <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-600 font-medium">
    ❌ This order has been cancelled.
  </div>
)}
      <div className="space-y-4">

        {steps.map((step, index) => {

          const completed = index <= currentIndex;

          return (

            <div
              key={step}
              className="flex items-center gap-4"
            >

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
                ${
                  completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              <div className="flex-1">

                <p
                  className={`font-medium ${
                    completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}