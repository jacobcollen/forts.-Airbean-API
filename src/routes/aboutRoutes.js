import { Router } from "express";
import { aboutInfo } from "../../config/about.js";

const router = Router();

//GET about page
router.get("/", (req, res) => {
  res.json(aboutInfo);
});

export default router;

//GET localhost:3000/about
