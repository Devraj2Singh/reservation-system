import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import siteRoutes from "./routes/siteRoutes.js";
import timeSlotRoutes from "./routes/timeSlotRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://reservation-system-6xm6.vercel.app",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initializeSocket(io);

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman/HTTPie requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/slots", timeSlotRoutes);

app.get("/", (req, res) => {
  res.send("Reservation System API is Running 🚀");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Client Connected");

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});