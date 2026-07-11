import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    totalTickets: {
      type: Number,
      required: true,
      min: 1,
    },

    availableTickets: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  },
);

export default mongoose.model("TimeSlot", timeSlotSchema);
