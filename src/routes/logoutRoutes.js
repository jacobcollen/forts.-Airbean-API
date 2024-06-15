import { Router } from "express";
import { logoutController } from "../controllers/logoutController.js";

const router = Router();

// POST route for user logout
router.post("/", logoutController);

export default router;