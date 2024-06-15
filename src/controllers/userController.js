import { getAllUsers, getUserById, updateUser, deleteUser } from "../services/user.js";

// Controller function to get all users
export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to get user by ID
export async function getUserByIdController(req, res) {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

// Controller function to update user
export async function updateUserController(req, res) {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const message = await updateUser(userId, updatedUserData);
    res.json({ message });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

// Controller function to delete user
export async function deleteUserController(req, res) {
  try {
    const userId = req.params.id;
    const message = await deleteUser(userId);
    res.json({ message });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
