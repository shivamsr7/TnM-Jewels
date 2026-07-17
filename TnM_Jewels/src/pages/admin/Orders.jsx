import { useEffect, useState } from "react";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaBoxOpen,
  FaCreditCard,
  FaTimes,
  FaCheckCircle,
  FaTruck,
  FaMoneyBillWave,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { FaEye } from "react-icons/fa";
function StatusBadge({ status }) {
  const config = {
    Pending: {
      icon: <FaClock />,
      className: "bg-yellow-100 text-yellow-700",
    },
    Confirmed: {
      icon: <FaCheckCircle />,
      className: "bg-blue-100 text-blue-700",
    },
    Packed: {
      icon: <FaBoxOpen />,
      className: "bg-purple-100 text-purple-700",
    },
    Shipped: {
      icon: <FaTruck />,
      className: "bg-indigo-100 text-indigo-700",
    },
    Delivered: {
      icon: <FaCheckCircle />,
      className: "bg-green-100 text-green-700",
    },
    Cancelled: {
      icon: <FaTimesCircle />,
      className: "bg-red-100 text-red-700",
    },
  };

  const badge = config[status] || {
    icon: <FaClock />,
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${badge.className}`}
    >
      {badge.icon}
      {status}
    </span>
  );
}
function PaymentBadge({ status }) {
  const config = {
    Pending: {
      icon: <FaClock />,
      className: "bg-yellow-100 text-yellow-700",
    },
    Paid: {
      icon: <FaMoneyBillWave />,
      className: "bg-green-100 text-green-700",
    },
    Failed: {
      icon: <FaTimesCircle />,
      className: "bg-red-100 text-red-700",
    },
    COD: {
      icon: <FaMoneyBillWave />,
      className: "bg-blue-100 text-blue-700",
    },
  };

  const badge = config[status] || {
    icon: <FaClock />,
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${badge.className}`}
    >
      {badge.icon}
      {status}
    </span>
  );
}
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
const [selectedOrder, setSelectedOrder] = useState(null);
const [orderItems, setOrderItems] = useState([]);
const [modalOpen, setModalOpen] = useState(false);
const [modalLoading, setModalLoading] = useState(false);
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, search, statusFilter,paymentFilter]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
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
  const fetchOrderDetails = async (id) => {
  try {
    setModalLoading(true);

    const res = await fetch(
      `http://localhost:5000/api/orders/${id}`
    );

    const data = await res.json();

    if (data.success) {
      setSelectedOrder(data.order);
      setOrderItems(data.items);
      setModalOpen(true);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setModalLoading(false);
  }
};
const updateOrderStatus = async (id, status) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/orders/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_status: status,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success("Order status updated.");

    // Refresh table
    fetchOrders();

    // Refresh selected order
    setSelectedOrder(data.order);

  } catch (err) {
    console.error(err);

    toast.error("Unable to update order.");
  }
};
  const filterOrders = () => {
    let result = [...orders];

    if (search) {
      result = result.filter(
        (order) =>
          order.order_number
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          order.customer_name
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (order) => order.order_status === statusFilter
      );
    }
    if (paymentFilter !== "All") {
  result = result.filter(
    (order) =>
      order.payment_status === paymentFilter
  );
}

    setFilteredOrders(result);
  };

  if (loading) {
    return <div className="space-y-4">
  {[1, 2, 3].map((item) => (
    <div
      key={item}
      className="h-20 animate-pulse rounded-xl bg-gray-100"
    />
  ))}
</div>
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Orders
        </h1>

      </div>

      {/* Filters */}

<div className="mb-6 flex flex-wrap items-center gap-4">

  {/* Search */}

  <div className="relative">

    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

    <input
      type="text"
      placeholder="Search Order..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="h-11 w-72 rounded-xl border border-gray-300 pl-11 pr-4 outline-none transition focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/20"
    />

  </div>

  {/* Status */}

  <div className="relative">

    <FaBoxOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="h-11 rounded-xl border border-gray-300 bg-white pl-11 pr-8 outline-none transition focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/20"
    >
      <option value="All">All Status</option>
      <option value="Pending">Pending</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Packed">Packed</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>

  </div>

  {/* Payment */}

  <div className="relative">

    <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

    <select
      value={paymentFilter}
      onChange={(e) => setPaymentFilter(e.target.value)}
      className="h-11 rounded-xl border border-gray-300 bg-white pl-11 pr-8 outline-none transition focus:border-[#C8A45C] focus:ring-2 focus:ring-[#C8A45C]/20"
    >
      <option value="All">All Payments</option>
      <option value="Pending">Pending</option>
      <option value="Paid">Paid</option>
      <option value="Failed">Failed</option>
    </select>

  </div>

  {/* Clear */}

  <button
    onClick={() => {
      setSearch("");
      setStatusFilter("All");
      setPaymentFilter("All");
    }}
    className="flex h-11 items-center gap-2 rounded-xl border border-red-500 px-5 text-red-500 transition hover:bg-red-500 hover:text-white"
  >
    <FaTimes />
    Clear
  </button>

</div>
<button
  onClick={() => {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
  }}
  className="rounded-xl border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
>
  Clear Filters
</button>
      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Order
              </th>

              <th className="text-left">
                Customer
              </th>
<th className="text-left">
  Payment
</th>
              <th className="text-left">
                Total
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Date
              </th>

              <th className="text-center">
  Action
</th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t"
              >

                <td className="px-6 py-5 font-semibold">
                  {order.order_number}
                </td>

<td >

  <div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A45C] text-sm font-bold text-white">

      {order.customer_name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)}

    </div>

    <div>

<div className="text-sm text-gray-500">
  <p>{order.customer_name}</p>

  <p>
    {new Date(order.created_at).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })}
  </p>
</div>

      <p className="text-sm text-gray-500">
        {order.customer_phone}
      </p>

    </div>

  </div>

</td>

<td>

  <PaymentBadge status={order.payment_status} />

</td>

<td>
  ₹{order.total}
</td>

<td>

<StatusBadge status={order.order_status} />

</td>

                <td>
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="text-center">

<button
  onClick={() => fetchOrderDetails(order.id)}
  title="View Order Details"
  className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C8A45C] text-white transition-all duration-200 hover:scale-105 hover:bg-black"
>
  <FaEye size={16} />
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
<OrderDetailsModal
  open={modalOpen}
  order={selectedOrder}
  items={orderItems}
  loading={modalLoading}
  onClose={() => setModalOpen(false)}
  onStatusUpdate={updateOrderStatus}
/>
    </div>
  );
}