import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TnM Jewels API Running 🚀",
  });
});

export default app;