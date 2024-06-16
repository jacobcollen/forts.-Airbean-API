import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

import { initializeDatabase } from "./src/services/product.js";
import { initializeUserDatabase } from "./src/services/user.js";

import userRouter from "./src/routes/userRoutes.js";
import loginRouter from "./src/routes/loginRoutes.js";
import logoutRouter from "./src/routes/logoutRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import aboutRouter from "./src/routes/aboutRoutes.js";
import ordersRouter from "./src/routes/ordersRoutes.js";
import orderHistoryRouter from "./src/routes/orderHistoryRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import campaignRouter from "./src/routes/campaignRoutes.js";

import { authenticateToken, verifyAdmin, verifyCustomer } from "./src/middleware/auth.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes (Unprotected)
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/about", aboutRouter);
app.use("/products", productRouter);

// Routes (Protected for customers)
app.use("/cart", authenticateToken, verifyCustomer, cartRouter);
app.use("/orders", authenticateToken, verifyCustomer, ordersRouter);
app.use("/order-history", authenticateToken, verifyCustomer, orderHistoryRouter);

// Routes (Protected for admins)
app.use("/admin/products", authenticateToken, verifyAdmin, productRouter);
app.use("/admin/users", authenticateToken, verifyAdmin, userRouter);
app.use("/admin/campaigns", authenticateToken, verifyAdmin, campaignRouter);

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