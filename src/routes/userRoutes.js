import { Router } from "express";
import { validateUser } from "../middleware/userValidation.js";
import { authenticateToken, verifyAdmin } from '../middleware/auth.js';
import {
  addUser,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";
import { preventGuest } from "../middleware/preventGuest.js";

const router = Router();

// URL for CRUD operations: localhost:3000/user

// POST route for adding a new user (Admin or Customer)
router.post("/account", authenticateToken, verifyAdmin, addUser);

// GET route for fetching all users (Admins and Customers)
router.get("/", authenticateToken, verifyAdmin, getAllUsersController);

// GET route for fetching logged-in user's profile
router.get("/profile", authenticateToken, getUserByIdController);

// PUT route for updating user info
router.put("/", authenticateToken, validateUser, updateUserController);

// DELETE route for deleting user
router.delete("/", authenticateToken, preventGuest, deleteUserController);

export default router;
