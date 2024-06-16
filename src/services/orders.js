import { createOrUpdateOrderHistory, orderHistoryDb } from "./orderHistory.js";
import { userDatabase } from "./user.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js";

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const createOrder = async (cart) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return {
        status: 401,
        response: { error: "User not logged in" },
      };
    }

    const userId = loggedInUser._id;

    if (cart.length === 0) {
      return {
        status: 400,
        response: { error: "Cart is empty" },
      };
    }

    const user = await userDatabase.findOne({ _id: userId });
    if (!user) {
      return {
        status: 404,
        response: { error: "User not found" },
      };
    }

    const prelTime = new Date();
    const prelDelTime = new Date(prelTime.getTime() + 20 * 60000);

    function formatDate(date) {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const orderTime = formatDate(prelTime);
    const deliveryTime = formatDate(prelDelTime);

    const newOrder = {
      orderId: Math.floor(Math.random() * 1000000),
      userId,
      items: [...cart],
      totalPrice: calculateTotalPrice(cart),
      orderTime,
      deliveryTime,
    };

    const orderHistoryData = {
      userId,
      firstName: user.firstName,
      totalPrice: newOrder.totalPrice,
      orders: [newOrder],
    };

    await createOrUpdateOrderHistory(orderHistoryData);

    cart.length = 0;

    return {
      status: 201,
      response: {
        message: "Order has been placed successfully",
        orderId: newOrder.orderId,
      },
    };
  } catch (error) {
    return {
      status: 500,
      response: { error: "Failed to place order: " + error.message },
    };
  }
};

const getOrderById = async (orderId) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return {
        status: 401,
        response: { error: "User not logged in" },
      };
    }

    const userId = loggedInUser._id;

    // Find the order history document for the user
    const orderHistory = await orderHistoryDb.findOne({ userId });
    if (!orderHistory) {
      return {
        status: 404,
        response: { error: "Order history not found" },
      };
    }

    // Find the specific order within the orders array
    const order = orderHistory.orders.find(
      (order) => order.orderId === parseInt(orderId, 10)
    );

    if (!order) {
      return {
        status: 404,
        response: { error: "Order not found" },
      };
    }

    return {
      status: 200,
      response: order,
    };
  } catch (error) {
    return {
      status: 500,
      response: { error: "Failed to fetch order: " + error.message },
    };
  }
};

export { createOrder, getOrderById };
