import express from "express";
import {
  getProducts,
  createProduct,
  getProductBySlug,
  getProductsByCategory,
  searchProducts,
  getCategories,
  checkSlug,
  getProductById,
  deleteProduct,
updateProduct,
getDashboardStats
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/dashboard/stats", getDashboardStats);

router.post("/", createProduct);



router.get("/categories", getCategories);

router.get("/search", searchProducts);

router.get("/check-slug/:slug", checkSlug);

router.get("/category/:category", getProductsByCategory);

router.get("/id/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);



router.get("/:slug", getProductBySlug);
export default router;