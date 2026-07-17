import supabase from "../config/supabase.js";

// GET Store Settings
export const getStoreSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("store_settings")
      .select("*")
      .limit(1)
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

// UPDATE Store Settings
export const updateStoreSettings = async (req, res) => {
  try {
    const { id, ...settings } = req.body;

    const { data, error } = await supabase
      .from("store_settings")
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
      message: "Settings updated successfully.",
      settings: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};