import express from "express";
import {
  getOrderHistory,
  getAllOrderHistoriesHandler,
} from "../controllers/orderHistoryController.js";

const router = express.Router();

// URL for CRUD operations: localhost:3000/api/order-history

// GET all order histories
router.get("/all", getAllOrderHistoriesHandler);

// GET order history
router.get("/", getOrderHistory);

export default router;
