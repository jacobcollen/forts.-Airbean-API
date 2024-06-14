import { logoutUser } from "../services/logout.js";
import { findLoggedInUser } from "../utils/findLoggedUser.js";
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, secret);
    const userEmail = decoded.email;

    const loggedInUser = await findLoggedInUser(userEmail);
    if (!loggedInUser) {
      throw new Error("No logged in user found");
    }

    const response = await logoutUser(loggedInUser._id);

    return res.status(200).json(response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
}
