import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../services/product.js";

// GET all products (public)
export async function getAllProductsController(req, res) {
  try {
      const products = await getAllProducts();
      res.json(products);
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
}

// GET specific product by ID (public)
export async function getProductByIdController(req, res) {
  try {
      const id = req.params.id;
      const product = await getProductById(id);
      if (product) {
          res.json(product);
      } else {
          res.status(404).json({ message: "Product not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
}

// POST new product (admin only)
export async function createProductController(req, res) {
  try {
      const newProduct = req.body;
      await createProduct(newProduct);
      res.status(201).json({ message: "New product successfully created", product: newProduct });
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
}

// UPDATE product by ID (admin only)
export async function updateProductController(req, res) {
  try {
      const id = req.params.id;
      const updatedProduct = req.body;
      await updateProduct(id, updatedProduct);
      res.json({ message: "Product updated successfully" });
  } catch (error) {
      if (error.status === 404) {
          res.status(404).json({ message: "Product not found" });
      } else {
          res.status(500).json({ message: "Internal server error" });
      }
  }
}

// DELETE product by ID (admin only)
export async function deleteProductController(req, res) {
  try {
      const id = req.params.id;
      await deleteProduct(id);
      res.json({ message: "Product deleted successfully" });
  } catch (error) {
      if (error.status === 404) {
          res.status(404).json({ message: "Product not found" });
      } else {
          res.status(500).json({ message: "Internal server error" });
      }
  }
}
