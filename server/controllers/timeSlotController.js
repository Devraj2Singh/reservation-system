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