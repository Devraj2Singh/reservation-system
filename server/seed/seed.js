import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Site from "../models/Site.js";
import TimeSlot from "../models/TimeSlot.js";

dotenv.config();

await connectDB();

await Site.deleteMany();
await TimeSlot.deleteMany();

const redFort = await Site.create({
  name: "Red Fort",
  location: "Delhi",
  description: "Historic Fort",
});

await TimeSlot.insertMany([
  {
    site: redFort._id,
    date: new Date("2026-07-12"),
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    totalTickets: 100,
    availableTickets: 100,
  },
  {
    site: redFort._id,
    date: new Date("2026-07-12"),
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    totalTickets: 100,
    availableTickets: 100,
  },
  {
    site: redFort._id,
    date: new Date("2026-07-12"),
    startTime: "12:00 PM",
    endTime: "01:00 PM",
    totalTickets: 100,
    availableTickets: 100,
  },
]);

console.log("Seed Successful 🌱");

process.exit();