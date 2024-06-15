import { database } from "../services/user.js";

//Function that updates the loggedIn flag for a user
//This is being used when a user is being deleted, logged out or logged in.
//If a user logs out or deletes himself, set guest to logged in.
//If a user logs in, log out the user that is currently logged in.

export async function updateUserLoggedInStatus(userId, status) {
  await database.update({ _id: userId }, { $set: { loggedIn: status } });
}
