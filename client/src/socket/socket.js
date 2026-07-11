import { io } from "socket.io-client";

const socket = io("https://reservation-system-production-31b0.up.railway.app/api");

export default socket;