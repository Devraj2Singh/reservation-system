import "../styles/card.css";

const SlotCard = ({ slot, onBook }) => {
  return (
    <div className="slot-card">

      <h2>{slot.site.name}</h2>

      <p>📍 {slot.site.location}</p>

      <p>
        🕒 {slot.startTime} - {slot.endTime}
      </p>

      <div className="ticket-count">
        🎫 {slot.availableTickets} Tickets Left
      </div>

      <button
        className="book-btn"
        onClick={onBook}
      >
        Book Now
      </button>

    </div>
  );
};

export default SlotCard;