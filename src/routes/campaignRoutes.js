import express from "express";
import {
  createCampaignController,
  getAllCampaignsController,
} from "../controllers/campaignController.js";
import { validateCampaign } from "../middleware/campaignValidation.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyAdmin, validateCampaign, createCampaignController);
router.get("/", verifyAdmin, getAllCampaignsController);

export default router;
