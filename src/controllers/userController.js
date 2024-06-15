import { getAllUsers, getUserById, updateUser, deleteUser, createUser } from "../services/user.js";

export async function createUserController(req, res) {
  try {
    const userData = req.body;
    const { message, newUser } = await createUser(userData);
    res.status(201).json({ message, newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

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
