import express from "express";
import { createOrder, getOrderById } from "../services/orders.js";
import { getCart } from "../routes/cart.js";
import { calculateTotalPrice } from "../routes/cart.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js";

const router = express.Router({ mergeParams: true });

//Place order
router.post("/", bodyContentBlocker, async (req, res) => {
  const loggedInUser = await findLoggedInUser();
  const userId = loggedInUser._id;
  const cart = getCart(userId); // Fetch the user's specific cart

  const totalPrice = calculateTotalPrice(cart);

  console.log();

  const result = await createOrder(userId, cart, totalPrice); // Pass the cart to createOrder
  res.status(result.status).json(result.response);
});

//See specific order
router.get("/:orderId", bodyContentBlocker, async (req, res) => {
  const loggedInUser = await findLoggedInUser();
  const userId = loggedInUser._id;
  const orderId = req.params.orderId;
  const result = await getOrderById(userId, orderId);
  res.status(result.status).json(result.response);
});

export default router;
