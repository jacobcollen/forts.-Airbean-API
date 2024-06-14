import { findCustomerByEmail, getAllCustomers } from "./customers.js";
import { findAdminByEmail } from "./admin.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

// Function to handle customer login
export async function loginCustomer(email, password) {

  const customer = await findCustomerByEmail(email);

  if (!customer) {
    throw new Error("Invalid email");
  }

  if (customer.password === password) {

    const customers = await getAllCustomers();
    const loggedInCustomer = customers.find((cust) => cust.loggedIn);

    if (loggedInCustomer) {

      await updateCustomerLoggedInStatus(loggedInCustomer._id, false);
    }

    const updatedCustomer = await updateCustomerLoggedInStatus(customer._id, true);

    const token = jwt.sign({ email: customer.email, role: "customer" }, secret, { expiresIn: '1h' });

    return { message: "Login successful", customer: updatedCustomer, token };
  } else {
    throw new Error("Invalid password");
  }
}

// Function to handle admin login
export async function loginAdmin(email, password) {

  const admin = await findAdminByEmail(email);

  if (!admin) {
    throw new Error("Invalid email");
  }

  if (password === admin.password) {
    
    const token = jwt.sign({ email: admin.email, role: "admin" }, secret, { expiresIn: '1h' });

    return { message: "Admin logged in successfully", token };
  } else {
    throw new Error("Invalid password");
  }
}
