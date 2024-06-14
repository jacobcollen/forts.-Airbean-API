import { Router } from "express";
import { getProductById } from "../services/product.js";
import { bodyContentBlocker } from "../middleware/bodyContentBlocker.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js";

const router = Router({ mergeParams: true });
const carts = {}; // Object to store carts for each user

// Calculate total price of items in the cart
const calculateTotalPrice = (cart) => {
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cart.length >= 5) {
    total *= 0.8;
  } else if (cart.length >= 3) {
    total *= 0.9;
  }
  return total;
};

// Find or create cart
const getCart = (userId) => {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  return carts[userId];
};

// GET cart
router.get("/", bodyContentBlocker, async (req, res, next) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(404).json({ message: "No logged in user found" });
    }
    const userId = loggedInUser._id;
    const cart = getCart(userId);

    if (cart.length === 0) {
      return res.json({
        message: "Your cart is empty",
      });
    }

    const totalPrice = calculateTotalPrice(cart);

    res.status(200).json({
      success: true,
      status: 200,
      data: {
        cart,
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST add product to cart
router.post("/:productId", bodyContentBlocker, async (req, res, next) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(404).json({ message: "No logged in user found" });
    }
    const userId = loggedInUser._id;
    const productId = req.params.productId;
    const foundItem = await getProductById(productId);

    if (!foundItem) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "The product you are trying to add does not exist.",
      });
    }

    const cart = getCart(userId);
    cart.push(foundItem);

    const totalPrice = calculateTotalPrice(cart);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product added to cart",
      data: {
        cart,
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
});

// DELETE delete product from cart
router.delete("/:productId", bodyContentBlocker, async (req, res, next) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(404).json({ message: "No logged in user found" });
    }
    const userId = loggedInUser._id;
    const productId = req.params.productId;
    const cart = getCart(userId);
    const foundItemIndex = cart.findIndex((item) => item._id === productId);

    if (foundItemIndex === -1) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "The product you are trying to remove is not in the cart",
      });
    }

    cart.splice(foundItemIndex, 1);

    const totalPrice = calculateTotalPrice(cart);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Product removed from cart",
      data: {
        cart,
        totalPrice,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
export { getCart, calculateTotalPrice };
