import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaTruck, FaWhatsapp } from "react-icons/fa";

export default function OrderSuccess() {
  const { state } = useLocation();

  const order = state?.order;
if (!order) {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold">
        No Order Found
      </h2>

      <p className="mt-4 text-gray-600">
        We couldn't find any recent order details.
      </p>

      <Link
        to="/shop"
        className="mt-8 inline-block rounded-xl bg-[#C8A45C] px-6 py-3 font-semibold text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
  const estimatedStart = new Date();
  estimatedStart.setDate(estimatedStart.getDate() + 5);

  const estimatedEnd = new Date();
  estimatedEnd.setDate(estimatedEnd.getDate() + 7);

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">

      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">

        <FaCheckCircle className="mx-auto mb-6 text-7xl text-green-500" />

        <h1 className="text-4xl font-bold">
          Order Confirmed!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with
          <span className="font-semibold"> T&M Jewels.</span>
        </p>

        <div className="mt-10 rounded-2xl bg-gray-50 p-6">

          <div className="flex justify-between border-b py-3">
            <span>Order Number</span>

            <span className="font-semibold">
              {order?.order_number}
            </span>
          </div>

          <div className="flex justify-between border-b py-3">
            <span>Payment Method</span>

            <span>Cash on Delivery</span>
          </div>

          <div className="flex justify-between py-3">
            <span>Estimated Delivery</span>

            <span>
              {formatDate(estimatedStart)} - {formatDate(estimatedEnd)}
            </span>
          </div>

        </div>

        <div className="mt-10 rounded-2xl border p-6 text-left">

          <h3 className="mb-4 text-lg font-semibold">
            What Happens Next?
          </h3>

          <ul className="space-y-3 text-gray-600">

            <li>✅ Your order has been received.</li>

            <li>📦 We'll carefully pack your jewellery.</li>

            <li>
              <FaTruck className="mr-2 inline" />
              Shipping updates will be shared soon.
            </li>

          </ul>

        </div>

        <div className="mt-10 rounded-2xl bg-[#FFF9F0] p-5">

          <h3 className="font-semibold">
            Need Help?
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Our support team is always happy to assist you.
          </p>

          <a
            href="https://wa.me/918869988948"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-white hover:bg-green-600"
          >
            <FaWhatsapp />
            Chat on WhatsApp
          </a>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            to="/shop"
            className="rounded-xl bg-[#C8A45C] px-8 py-3 font-semibold text-white hover:bg-black"
          >
            Continue Shopping
          </Link>

          <button
            disabled
            className="cursor-not-allowed rounded-xl border px-8 py-3 text-gray-400"
          >
            Track Order (Coming Soon)
          </button>

        </div>

      </div>

    </div>
  );
}