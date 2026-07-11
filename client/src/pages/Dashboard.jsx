import { useEffect, useState } from "react";
import socket from "../socket/socket";
import API from "../services/api";
import "../styles/card.css";

const Dashboard = () => {
  const [slots, setSlots] = useState([]);

  const fetchCapacity = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/bookings/capacity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSlots(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCapacity();

    socket.on("capacityUpdated", fetchCapacity);

    return () => {
      socket.off("capacityUpdated", fetchCapacity);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="cards-container">
        {slots.map((slot) => (
          <div key={slot._id} className="slot-card">
            <h2>{slot.site.name}</h2>

            <p>📍 {slot.site.location}</p>

            <p>
              🕒 {slot.startTime} - {slot.endTime}
            </p>

            <div className="ticket-count">
              🎫 {slot.availableTickets} / {slot.totalTickets}
            </div>

            <progress
              value={slot.availableTickets}
              max={slot.totalTickets}
              style={{
                width: "100%",
                height: "12px",
                marginTop: "15px",
              }}
            />

            <p
              style={{
                marginTop: "10px",
                fontWeight: "600",
                color:
                  slot.availableTickets < 20
                    ? "#dc2626"
                    : "#16a34a",
              }}
            >
              {slot.availableTickets < 20
                ? "Almost Full"
                : "Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;