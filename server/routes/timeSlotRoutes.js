import express from "express";
import { getSlots } from "../controllers/timeSlotController.js";

const router = express.Router();

router.get("/", getSlots);

export default router;