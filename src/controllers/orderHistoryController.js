import { getAllOrderHistories, getOrderHistoryById } from "../services/orderHistory.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js"; // Update import to findLoggedInUser

export const getOrderHistory = async (req, res) => {
  try {
    const loggedInUser = await findLoggedInUser();
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not logged in" });
    }
    const id = loggedInUser._id;
    const orderHistory = await getOrderHistoryById(id);
    return res.status(200).json(orderHistory);
  } catch (error) {
    return res.status(404).json({ message: "Order History not found" });
  }
};

export const getAllOrderHistoriesHandler = async (req, res) => {
  try {
    const orderHistories = await getAllOrderHistories();
    return res.status(200).json(orderHistories);
  } catch (error) {
    return res.status(404).json({ message: "No order histories found" });
  }
};