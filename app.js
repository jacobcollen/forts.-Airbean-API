import express from "express";
import cors from "cors";

import { initializeDatabase } from "./src/services/product.js";
import { initializeUserDatabase } from "./src/services/user.js";

import userRouter from "./src/routes/userRoutes.js";
import loginRouter from "./src/routes/login.js";
import logoutRouter from "./src/routes/logout.js";
import cartRouter from "./src/routes/cart.js";
import aboutRouter from "./src/routes/about.js";
import ordersRouter from "./src/routes/orders.js";
import orderHistoryRouter from "./src/routes/orderHistory.js";
import productRouter from "./src/routes/products.js";

import protectedRoute from "./src/middleware/protectedRoutes.js";
import { logCartParam, logOrderHistory, logOrdersParam } from "./src/middleware/routeConsoleLogs.js";
import { authenticateToken, verifyAdmin } from "./src/middleware/auth.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/about", aboutRouter);

// Protected product route
app.use("/products", authenticateToken, productRouter);

// Protected cart route
app.use("/cart", authenticateToken, logCartParam, cartRouter);

// Protected orders route
app.use("/orders", authenticateToken, logOrdersParam, ordersRouter);

// Protected order history route
app.use("/order-history", authenticateToken, logOrderHistory, orderHistoryRouter);

// Middleware for admin-only route
app.use("/admin", authenticateToken, verifyAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});

// ProtectedRoute to validate customer ID
app.use("/customer/:id", authenticateToken, protectedRoute, (req, res) => {
  res.status(200).json({ message: "Customer is valid and authenticated!" });
});

// Initialize databases with default data if empty, then start the server
const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => initializeUserDatabase())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the databases:", error);
    process.exit(1);
  });
