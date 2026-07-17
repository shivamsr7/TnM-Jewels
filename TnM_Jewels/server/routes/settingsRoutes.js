import express from "express";
import {
  getStoreSettings,
  updateStoreSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getStoreSettings);

router.put("/", updateStoreSettings);

export default router;