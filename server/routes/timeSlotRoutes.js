import express from "express";
import { getSlots, createSlot } from "../controllers/timeSlotController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSlots);

router.post("/", protect, adminOnly, createSlot);

export default router;
