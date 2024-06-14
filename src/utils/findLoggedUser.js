import { userDatabase } from "../services/user.js";

export async function findLoggedInUser() {
  try {
    const loggedInUser = await userDatabase.findOne({ loggedIn: true });
    return loggedInUser;
  } catch (error) {
    throw new Error("Failed to find the logged-in user");
  }
}
