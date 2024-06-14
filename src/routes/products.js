import { Router } from "express";
import { validateProduct } from "../middleware/productValidation.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { authenticateToken, verifyAdmin } from '../middleware/auth.js';

const router = Router();

// URL for CRUD operations: localhost:3000/products

// GET all menu items
router.get("/", bodyContentBlocker, async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

// POST new menu item (admin only)
router.post("/", authenticateToken, verifyAdmin, validateProduct, async (req, res) => {
  const newProduct = req.body;
  await createProduct(newProduct);
  res.status(201).json(newProduct);
});

// GET specific menu item by _id
router.get("/:id", bodyContentBlocker, async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Menu item not found" });
  }
});

// UPDATE menu item by _id (admin only)
router.put("/:id", authenticateToken, verifyAdmin, validateProduct, async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  try {
    await updateProduct(id, updatedProduct);
    res.json({ message: "Menu item updated successfully" });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// DELETE menu item by _id (admin only)
router.delete("/:id", authenticateToken, verifyAdmin, bodyContentBlocker, async (req, res) => {
  const id = req.params.id;
  try {
    await deleteProduct(id);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;
