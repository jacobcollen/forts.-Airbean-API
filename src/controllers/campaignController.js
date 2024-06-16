import { createCampaign, getAllCampaigns } from "../services/campaign.js";

// POST new campaign
export async function createCampaignController(req, res) {
  try {
    const newCampaign = req.body;
    const createdCampaign = await createCampaign(newCampaign);
    res.status(201).json(createdCampaign);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({
          message: "Internal server error, make sure to insert correct data",
        });
    }
  }
}

// GET all campaigns
export async function getAllCampaignsController(req, res) {
  try {
    const campaigns = await getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal server error, make sure to insert correct data",
      });
  }
}
