import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// POST route for user logout
router.post("/", authenticateToken, logoutController);

export default router;
