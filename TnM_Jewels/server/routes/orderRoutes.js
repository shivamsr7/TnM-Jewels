import express from "express";
import { createOrder,getOrders,getOrderById,updateOrderStatus,getRecentOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/recent", getRecentOrders);
router.get("/:id", getOrderById);

router.put("/:id/status", updateOrderStatus);
export default router;