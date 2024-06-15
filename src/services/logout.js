import { userDatabase } from "./user.js";

// Function to handle user logout
export async function logoutUser(userId) {
  try {
    await userDatabase.update({ _id: userId }, { $set: { loggedIn: false } });
    return { message: "User Logged Out Successfully" };
  } catch (error) {
    throw new Error("Failed to Logout User");
  }
}
