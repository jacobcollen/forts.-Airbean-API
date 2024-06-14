import nedb from "nedb-promises";

const userDatabase = new nedb({ filename: "users.db", autoload: true });

// Default admin/customer for testing
async function initializeUserDatabase() {
  try {
    const users = await userDatabase.find({});
    if (users.length === 0) {
      const defaultAdmin = {
        firstName: "Admin",
        lastName: "Adminson",
        email: "admin@adminmail.com",
        password: "adminpassword",
        phoneNumber: "9999999999",
        role: "admin",
        loggedIn: false,
      };
      const defaultCustomer = {
        firstName: "Customer",
        lastName: "Doe",
        email: "customer@example.com",
        password: "customerpassword",
        phoneNumber: "8888888888",
        role: "customer",
        loggedIn: false,
      };
      await userDatabase.insert(defaultAdmin);
      await userDatabase.insert(defaultCustomer);
      console.log("User database initialized with default users.");
    }
  } catch (error) {
    console.error("Failed to initialize user database:", error);
  }
}

// User functions
async function createUser(userData) {
  try {
    const newUser = await userDatabase.insert(userData);
    const message = `User Created. Welcome ${newUser.firstName}`;
    return { message, newUser };
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

async function getAllUsers() {
  try {
    const users = await userDatabase.find({});
    if (users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  } catch (error) {
    throw Error(error.message);
  }
}

async function getUserById(id) {
  try {
    const user = await userDatabase.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

async function updateUser(id, updatedUserData) {
  try {
    const user = await userDatabase.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    await userDatabase.update({ _id: id }, { $set: updatedUserData });
    return "User updated successfully";
  } catch (error) {
    throw Error(error.message);
  }
}

async function deleteUser(id) {
  try {
    const numRemoved = await userDatabase.remove({ _id: id });
    if (numRemoved === 0) {
      throw new Error("User not found");
    }
    return "User deleted successfully";
  } catch (error) {
    throw Error(error.message);
  }
}

async function findUserByEmail(email) {
  try {
    const user = await userDatabase.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Failed to find user by email");
  }
}

export {
  userDatabase,
  initializeUserDatabase,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
};
