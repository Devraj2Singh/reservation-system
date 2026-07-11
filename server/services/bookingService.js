import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import TimeSlot from "../models/TimeSlot.js";
import { getIO } from "../socket/socket.js";

export const createReservation = async (user, bookingData) => {
  const { slotId, quantity } = bookingData;

  if (!slotId || !quantity || quantity <= 0) {
    throw new Error("Valid slot and quantity are required");
  }

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    // Find slot and decrease tickets atomically
    const slot = await TimeSlot.findOneAndUpdate(
      {
        _id: slotId,
        availableTickets: {
          $gte: quantity,
        },
      },
      {
        $inc: {
          availableTickets: -quantity,
        },
      },
      {
        new: true,
        session,
      },
    );

    if (!slot) {
      throw new Error("Not enough tickets available");
    }

    // Create reservation
    const reservation = await Reservation.create(
      [
        {
          user: user._id,
          slot: slot._id,
          quantity,
          status: "BOOKED",
        },
      ],
      {
        session,
      },
    );

    // Commit transaction
    await session.commitTransaction();

    // Notify dashboard
    // getIO().emit("capacityUpdated", {
    //     slotId: slot._id,
    //     availableTickets: slot.availableTickets,
    // });

    return {
      message: "Booking Successful",
      reservation: reservation[0],
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const cancelReservation = async (user, reservationId) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const reservation =
      await Reservation.findById(reservationId).session(session);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    // IDOR Protection
    if (reservation.user.toString() !== user._id.toString()) {
      throw new Error("Unauthorized");
    }

    if (reservation.status === "CANCELLED") {
      throw new Error("Reservation already cancelled");
    }

    const slot = await TimeSlot.findById(reservation.slot).session(session);

    if (!slot) {
      throw new Error("Time slot not found");
    }

    slot.availableTickets += reservation.quantity;

    await slot.save({ session });

    reservation.status = "CANCELLED";

    await reservation.save({ session });

    await session.commitTransaction();

    return {
      message: "Reservation Cancelled Successfully",
    };
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};

export const getCapacityData = async () => {
  const slots = await TimeSlot.find().populate("site");

  return slots;
};

export const getMyReservations = async (user) => {
  const reservations = await Reservation.find({
    user: user._id,
  })
    .populate({
      path: "slot",
      populate: {
        path: "site",
      },
    })
    .sort({ createdAt: -1 });

  return reservations;
};
