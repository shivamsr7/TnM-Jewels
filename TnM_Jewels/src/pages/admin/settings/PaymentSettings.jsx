import useSettings from "../../../hooks/useSettings";
export default function PaymentSettings() {

    const {
  loading,
  settings,
  handleChange,
  saveSettings,
} = useSettings(
  "http://localhost:5000/api/payment-settings",
  {
    id: "",
    cod_enabled: true,
    razorpay_enabled: false,
    razorpay_key_id: "",
    test_mode: true,
    minimum_cod_order: 0,
    maximum_cod_order: 5000,
  }
);
return (
  <div className="rounded-2xl bg-white p-8 shadow">

    <h2 className="mb-6 text-2xl font-semibold">
      Payment Settings
    </h2>
    <div className="space-y-4"><Toggle
      label="Enable Cash on Delivery"
      name="cod_enabled"
      checked={settings.cod_enabled}
      onChange={handleChange}
    />

    <Toggle
      label="Enable Razorpay"
      name="razorpay_enabled"
      checked={settings.razorpay_enabled}
      onChange={handleChange}
    />
<Toggle
  label="Test Mode"
  name="test_mode"
  checked={settings.test_mode}
  onChange={handleChange}
/></div>

    
<div className="grid gap-6 md:grid-cols-2">

  <Input
    label="Minimum COD Order"
    type="number"
    name="minimum_cod_order"
    value={settings.minimum_cod_order}
    onChange={handleChange}
  />

  <Input
    label="Maximum COD Order"
    type="number"
    name="maximum_cod_order"
    value={settings.maximum_cod_order}
    onChange={handleChange}
  />

</div>

<div className="mt-6">

{settings.razorpay_enabled && (
  <Input
    label="Razorpay Key ID"
    name="razorpay_key_id"
    value={settings.razorpay_key_id}
    onChange={handleChange}
  />
)}
<button
  onClick={saveSettings}
  className="mt-8 rounded-xl bg-[#C8A45C] px-8 py-3 font-semibold text-white transition hover:bg-black"
>
  Save Changes
</button>
</div>
  </div>
  );
}
function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center justify-between rounded-xl border p-4">
      <span className="font-medium">
        {label}
      </span>

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-[#C8A45C]"
      />
    </label>
  );
}
function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border p-3 outline-none focus:border-[#C8A45C]"
      />
    </div>
  );
}