import { findUserByEmail } from "./user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

// Function to handle user login (both admin and customer)
export async function loginUser(email, password) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email");
  }

  if (user.password === password) {
    const token = jwt.sign({ email: user.email, role: user.role }, secret, { expiresIn: '1h' });

    return { message: "Login successful", user, token };
  } else {
    throw new Error("Invalid password");
  }
}
