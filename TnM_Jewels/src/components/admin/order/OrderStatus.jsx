export default function OrderStatus({
  order,
  status,
  setStatus,
  onSave,
}) {
  return (
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

      <button
        disabled={status === order?.order_status}
        onClick={onSave}
        className={`mt-5 w-full rounded-xl py-3 font-semibold transition ${
          status === order?.order_status
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-[#C8A45C] text-white hover:bg-black"
        }`}
      >
        Save Changes
      </button>

    </div>
  );
}