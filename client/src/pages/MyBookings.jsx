import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

import "../styles/card.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Booking Cancelled");

      fetchBookings();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Cancellation Failed"
      );
    }
  };

  return (
    <div className="container">

      <h1 className="page-title">My Bookings</h1>

      <div className="cards-container">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="slot-card"
          >

            <h2>{booking.slot.site.name}</h2>

            <p>📍 {booking.slot.site.location}</p>

            <p>
              🕒 {booking.slot.startTime} - {booking.slot.endTime}
            </p>

            <p>🎫 Tickets : {booking.quantity}</p>

            <div className="ticket-count">

              {booking.status === "BOOKED"
                ? "✅ BOOKED"
                : "❌ CANCELLED"}

            </div>

            <button
              className="book-btn"
              disabled={booking.status === "CANCELLED"}
              onClick={() => handleCancel(booking._id)}
            >
              {booking.status === "BOOKED"
                ? "Cancel Booking"
                : "Already Cancelled"}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyBookings;