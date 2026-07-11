import asyncHandler from "../utils/asyncHandler.js";
import TimeSlot from "../models/TimeSlot.js";

// Get All Time Slots
export const getSlots = asyncHandler(async (req, res) => {
  const slots = await TimeSlot.find().populate("site");

  res.status(200).json(slots);
});

// Create New Time Slot (Admin)
export const createSlot = asyncHandler(async (req, res) => {
  const {
    site,
    date,
    startTime,
    endTime,
    totalTickets,
  } = req.body;

  if (
    !site ||
    !date ||
    !startTime ||
    !endTime ||
    !totalTickets
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (totalTickets <= 0) {
    res.status(400);
    throw new Error("Total tickets must be greater than zero");
  }

  const slot = await TimeSlot.create({
    site,
    date,
    startTime,
    endTime,
    totalTickets,
    availableTickets: totalTickets,
  });

  res.status(201).json({
    message: "Time slot created successfully",
    slot,
  });
});