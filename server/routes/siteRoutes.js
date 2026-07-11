import express from "express";
import { getAllSites, createSite } from "../controllers/siteController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSites);

router.post("/", protect, adminOnly, createSite);

export default router;
