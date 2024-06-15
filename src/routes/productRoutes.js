import express from 'express';
import { getAllProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController } from '../controllers/productController.js';
import { authenticateToken, verifyAdmin } from "../middleware/auth.js";
import { validateProduct } from "../middleware/productValidation.js";

const router = express.Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
// POST Create a new product (admin only)
router.post("/", authenticateToken, verifyAdmin, validateProduct, createProductController);
router.put("/:id", authenticateToken, verifyAdmin, validateProduct, updateProductController);
router.delete("/:id", authenticateToken, verifyAdmin, deleteProductController);

export default router;
