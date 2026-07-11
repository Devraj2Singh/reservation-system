import TimeSlot from "../models/TimeSlot.js";

export const getSlots = async (req, res) => {

    try {

        const slots = await TimeSlot
        .find()
        .populate("site");

        res.json(slots);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        })

    }

}

export const createSlot = async (req, res) => {
  try {
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
      return res.status(400).json({
        message: "All fields are required",
      });
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};