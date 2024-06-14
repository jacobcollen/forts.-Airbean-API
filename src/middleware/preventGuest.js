import { findLoggedInUser } from "../utils/findLoggedUser.js";

//Prevent guest account from updating itself

export async function preventGuest(req, res, next) {
  const loggedInUser = await findLoggedInUser();

  if (loggedInUser && loggedInUser._id === "guestintest") {
    return res.status(403).json({
      message: "Guests cannot execute this operation",
    });
  }

  next();
}
