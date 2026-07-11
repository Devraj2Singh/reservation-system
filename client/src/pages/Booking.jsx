import { useEffect, useState } from "react";
import socket from "../socket/socket";
import API from "../services/api";
import toast from "react-hot-toast";
import SlotCard from "../components/SlotCard";
import BookingModal from "../components/BookingModal";

import "../styles/card.css";
import "../styles/modal.css";

const Booking = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchSlots = async () => {
    try {
      const { data } = await API.get("/slots");
      setSlots(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchSlots();

  socket.on("capacityUpdated", () => {
    fetchSlots();
  });

  return () => {
    socket.off("capacityUpdated");
  };
}, []);

  const openBooking = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmBooking = async (slotId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          slotId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking Successful");

      setSelectedSlot(null);

      fetchSlots();
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">
  Reservation System
</h1>

      <div className="cards-container">

    {slots.map((slot)=>(

        <SlotCard
            key={slot._id}
            slot={slot}
            onBook={()=>openBooking(slot)}
        />

    ))}

</div>

      {selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onConfirm={confirmBooking}
        />
      )}
    </div>
  );
};

export default Booking;