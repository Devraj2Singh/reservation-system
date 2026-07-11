
import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import TimeSlot from "../models/TimeSlot.js";
import { getIO } from "../socket/socket.js";

export const createReservation = async (user, bookingData) => {

    const { slotId, quantity } = bookingData;

    if (!slotId || !quantity) {
        throw new Error("Slot and quantity are required");
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
        }
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
        }
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
    }
    catch (error) {
    await session.abortTransaction();
    throw error;
    }
    finally {
    session.endSession();
    }

};