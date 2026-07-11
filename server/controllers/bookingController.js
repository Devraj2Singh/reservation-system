import asyncHandler from "../utils/asyncHandler.js";

import {
  createReservation,
  cancelReservation,
  getCapacityData,
  getMyReservations,
} from "../services/bookingService.js";

// Create Booking
export const createBooking = asyncHandler(async (req, res) => {
  const data = await createReservation(req.user, req.body);

  res.status(201).json(data);
});

// Cancel Booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const result = await cancelReservation(
    req.user,
    req.params.id
  );

  res.status(200).json(result);
});

// Get Capacity
export const getCapacity = asyncHandler(async (req, res) => {
  const data = await getCapacityData();

  res.status(200).json(data);
});

// Get Logged-in User Bookings
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await getMyReservations(req.user);

  res.status(200).json(bookings);
});