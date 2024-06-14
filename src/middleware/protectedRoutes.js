import { getUserById } from "../services/user.js";

// Route middleware for protected routes
const protectedRoute = async (req, res, next) => {
  try {
    await getUserById(req.params.id);
    next();
  } catch (error) {
    // Return the error message from the service function
    return res.status(404).json({ message: error.message });
  }
};

export default protectedRoute;
