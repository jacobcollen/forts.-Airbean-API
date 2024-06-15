import express from 'express';
import { getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/userController.js';
import { authenticateToken, verifyAdmin } from "../middleware/auth.js";
import { validateUser } from '../middleware/userValidation.js';

const router = express.Router();

router.get("/", authenticateToken, verifyAdmin, getAllUsersController);
router.get("/:id", authenticateToken, verifyAdmin, getUserByIdController);
router.put("/:id", authenticateToken, verifyAdmin, validateUser, updateUserController);
router.delete("/:id", authenticateToken, verifyAdmin, deleteUserController);

export default router;
