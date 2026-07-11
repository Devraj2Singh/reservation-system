import express from "express";
import {
  createBooking,
  cancelBooking,
  getCapacity,
  getMyBookings,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/capacity", protect, adminOnly, getCapacity);

router.get("/my-bookings", protect, getMyBookings);

router.delete("/:id", protect, cancelBooking);

export default router;
