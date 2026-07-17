export default function CustomerInfo({ order }) {
  return (
    <div>

      <h3 className="mb-4 text-lg font-semibold">
        Customer Information
      </h3>

      <div className="grid gap-4 md:grid-cols-2">

        <Info
          label="Customer"
          value={order?.customer_name}
        />

        <Info
          label="Phone"
          value={order?.customer_phone}
        />

        <Info
          label="Email"
          value={order?.customer_email || "-"}
        />

        <Info
          label="Payment"
          value={order?.payment_method}
        />

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