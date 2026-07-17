import dotenv from "dotenv";
import app from "./app.js";
import orderRoutes from "./routes/orderRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import paymentSettingsRoutes from "./routes/paymentSettingsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use("/api/orders", orderRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/settings", settingsRoutes);
app.use(
  "/api/payment-settings",
  paymentSettingsRoutes
);
app.use("/api/payments", paymentRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});