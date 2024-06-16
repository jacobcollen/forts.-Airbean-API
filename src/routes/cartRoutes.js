import { Router } from "express";
import { getProductById } from "../services/product.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js";

const router = Router({ mergeParams: true });
const carts = {};

// Calculate total price of items in the cart
const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Find or create cart
const getCart = (userId) => {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  return carts[userId];
};

// GET cart
router.get("/", async (req, res, next) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
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
router.post("/:productId", async (req, res, next) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
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
router.delete("/:productId", async (req, res, next) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
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
