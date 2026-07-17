import { useEffect, useState } from "react";
import useSettings from "../../../hooks/useSettings";
import toast from "react-hot-toast";

export default function Settings() {


const {
  loading,
  settings,
  handleChange,
  saveSettings,
} = useSettings(
  "http://localhost:5000/api/settings",
  {
    id: "",
    store_name: "",
    support_email: "",
    support_phone: "",
    whatsapp_number: "",
    instagram_url: "",
    facebook_url: "",
    warehouse_address: "",
    logo_url: "",
    currency: "INR",
  }
);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Store Settings
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-xl font-semibold">
          General Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <Input
            label="Store Name"
            name="store_name"
            value={settings.store_name}
            onChange={handleChange}
          />

          <Input
            label="Support Email"
            name="support_email"
            value={settings.support_email}
            onChange={handleChange}
          />

          <Input
            label="Support Phone"
            name="support_phone"
            value={settings.support_phone}
            onChange={handleChange}
          />

          <Input
            label="WhatsApp Number"
            name="whatsapp_number"
            value={settings.whatsapp_number}
            onChange={handleChange}
          />

          <Input
            label="Instagram URL"
            name="instagram_url"
            value={settings.instagram_url}
            onChange={handleChange}
          />

          <Input
            label="Facebook URL"
            name="facebook_url"
            value={settings.facebook_url}
            onChange={handleChange}
          />

          <Input
            label="Logo URL"
            name="logo_url"
            value={settings.logo_url}
            onChange={handleChange}
          />

        </div>

        <div className="mt-6">

          <label className="mb-2 block font-medium">
            Warehouse Address
          </label>

          <textarea
            rows={4}
            name="warehouse_address"
            value={settings.warehouse_address}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        <button
          onClick={saveSettings}
          className="mt-8 rounded-xl bg-[#C8A45C] px-8 py-3 font-semibold text-white hover:bg-black"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}

function Input({
  label,
  ...props
}) {
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