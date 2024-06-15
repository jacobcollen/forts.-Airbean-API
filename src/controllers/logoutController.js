import { logoutUser } from "../services/logout.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
    console.error("JWT_SECRET is not set in the environment variables");
    process.exit(1);
}

export async function logoutController(req, res) {
  try {
    const user = req.user;

    const response = await logoutUser(user._id);

    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
}