import razorpay from "../services/razorpayService.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount.",
      });
    }

    const options = {
      amount: Math.round(amount * 100), // ₹ → paise
      currency: "INR",
      receipt: `TNM-${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Razorpay Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};