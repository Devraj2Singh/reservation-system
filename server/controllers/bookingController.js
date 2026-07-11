import { createReservation } from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  try {
    const data = await createReservation(req.user, req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};