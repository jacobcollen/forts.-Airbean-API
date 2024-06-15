import express from "express";
import { loginUser } from "../services/login.js";
import { updateUser } from "../services/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { message, user, token } = await loginUser(email, password);
    await updateUser(user._id, { loggedIn: true });
    res.json({ message, user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default router;
