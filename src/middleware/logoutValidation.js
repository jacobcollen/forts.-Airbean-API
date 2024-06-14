import { getUserById } from "../services/user.js";

// Validation middleware for logout
export async function validateLogout(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.loggedIn) {
      return res.status(400).json({ message: "User is already logged out" });
    }

    next();
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
}
