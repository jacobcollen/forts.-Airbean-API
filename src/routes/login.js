import { Router } from "express";
import loginSchema from "../models/loginSchema.js"
import { loginController } from "../controllers/loginController.js";
import { validateLoginCredentials } from "../middleware/loginValidation.js";

const router = Router();

// URL for CRUD operations: localhost:3000/login

// POST route for user login
router.post("/", validateLoginCredentials(loginSchema), loginController);

export default router;
