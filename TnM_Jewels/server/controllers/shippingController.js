import supabase from "../config/supabase.js";

export const calculateShipping = async (req, res) => {
  try {
    const { pincode, subtotal } = req.body;

    if (!pincode || pincode.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Valid pincode is required.",
      });
    }

    const prefix3 = pincode.substring(0, 3);
    const prefix2 = pincode.substring(0, 2);

    // Fetch all active zones
    const { data: zones, error } = await supabase
      .from("shipping_zones")
      .select("*")
      .eq("active", true);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Match the longest prefix first (3 digits before 2 digits)
    let zone =
      zones.find((z) => z.pincode_prefix === prefix3) ||
      zones.find((z) => z.pincode_prefix === prefix2);

    if (!zone) {
      return res.json({
        success: true,
        shippingCharge: 99,
        freeShipping: false,
        zone: "Default",
      });
    }

    const freeShipping =
      zone.free_shipping_above &&
      Number(subtotal) >= Number(zone.free_shipping_above);

res.json({
  success: true,
  zone: zone.zone_name,
  shippingCharge: freeShipping
    ? 0
    : Number(zone.shipping_charge),
  freeShipping,
  freeShippingAbove: Number(zone.free_shipping_above),
  estimatedDelivery: zone.estimated_delivery,
});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};