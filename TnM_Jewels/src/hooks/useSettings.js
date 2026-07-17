import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useSettings(endpoint, initialState) {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(initialState);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveSettings = async () => {
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Settings updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Unable to save settings.");
    }
  };

  return {
    loading,
    settings,
    setSettings,
    handleChange,
    saveSettings,
    fetchSettings,
  };
}