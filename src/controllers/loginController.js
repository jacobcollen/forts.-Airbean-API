import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import loginSchema from '../models/loginSchema.js';
import { findUserByEmail } from '../services/user.js';

dotenv.config();
const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error("JWT_SECRET is not set");
  process.exit(1);
}

export async function loginController(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;
    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email, role: user.role, _id: user._id }, secret, { expiresIn: '1h' });
    return res.status(200).json({ message: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in successfully`, token });

  } catch (error) {
    const statusCode = error.message === "Invalid email" || error.message === "Invalid password" ? 400 : 500;
    return res.status(statusCode).json({ message: error.message });
  }
}

export default loginController;
