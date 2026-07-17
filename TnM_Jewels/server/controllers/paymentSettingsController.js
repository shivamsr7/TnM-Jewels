import supabase from "../config/supabase.js";

// GET
export const getPaymentSettings = async (req, res) => {
  try {
 const { data, error } = await supabase
  .from("payment_settings")
  .select("*")
  .limit(1);

if (error) {
  return res.status(400).json({
    success: false,
    message: error.message,
  });
}

if (!data || data.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Payment settings not found.",
  });
}

const settings = data[0];

res.json({
  success: true,
  settings,
});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE
export const updatePaymentSettings = async (req, res) => {
  try {
    const { id, ...settings } = req.body;

    const { data, error } = await supabase
      .from("payment_settings")
      .update({
        ...settings,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      settings: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};