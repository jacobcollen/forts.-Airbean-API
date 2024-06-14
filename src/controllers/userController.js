import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
} from "../services/user.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js";

// Create new user (Admin/Customer)
export async function addUser(req, res) {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controller fetching all users (Admins/Customers)
export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Controller fetching a user by ID
export async function getUserByIdController(req, res) {
  try {
    const loggedInUser = await findLoggedInUser();
    const userId = loggedInUser._id;
    const user = await getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found", error: error.message });
  }
}

// Controller updating user by ID
export async function updateUserController(req, res) {
  try {
    const loggedInUser = await findLoggedInUser();
    const userId = loggedInUser._id;
    const updatedUserData = req.body;
    await updateUser(userId, updatedUserData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

// Controller deleting a user by ID
export async function deleteUserController(req, res) {
  try {
    const loggedInUser = await findLoggedInUser();
    const userId = loggedInUser._id;
    const user = await getUserById(userId);
    await deleteUser(userId);
    res.status(200).json({
      message: `User deleted successfully. Bye ${user.firstName}`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
