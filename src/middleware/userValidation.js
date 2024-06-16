import userSchema from "../models/userSchema.js";
import { findUserByEmail } from "../services/user.js";

// Validation for creating or updating a user
export async function validateUser(req, res, next) {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } =
      req.body;

    // Validate user data against the schema
    const { error } = userSchema.validate({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    });
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", error: error.details });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Additional validation checks can be added here

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
