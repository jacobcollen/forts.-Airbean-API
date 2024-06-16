import express from "express";
import { createOrder, getOrderById } from "../services/orders.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js";
import { getCart, calculateTotalPrice } from "./cartRoutes.js";

const router = express.Router({ mergeParams: true });

// Place order
router.post("/", async (req, res) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const cart = await getCart(loggedInUser._id);
    const totalPrice = calculateTotalPrice(cart);

    const orderData = {
      userId: loggedInUser._id,
      cart: cart,
      totalPrice: totalPrice,
    };

    const result = await createOrder(orderData);
    res
      .status(result.status)
      .json({ ...result.response, totalPrice: totalPrice });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to place order", error: error.message });
  }
});

// See specific order
router.get("/:orderId", async (req, res) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const orderId = req.params.orderId;
    const result = await getOrderById(orderId);
    res.status(result.status).json(result.response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: error.message });
  }
});

export default router;
