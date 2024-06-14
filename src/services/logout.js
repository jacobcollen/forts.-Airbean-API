import { userDatabase } from "./user.js";

// Function to handle user logout
export async function logoutUser(userId) {
  try {
    await userDatabase.update({ _id: userId }, { $set: { loggedIn: false } });
    return { message: "User logged out successfully" };
  } catch (error) {
    throw new Error("Failed to logout user");
  }
}
