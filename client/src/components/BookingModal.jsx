import { useState } from "react";
import "../styles/modal.css";

const BookingModal = ({ slot, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>{slot.site.name}</h2>

        <p>Available : {slot.availableTickets}</p>

        <div className="quantity">

          <button
            onClick={() =>
              quantity > 1 &&
              setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              quantity < slot.availableTickets &&
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>

        <button
          className="confirm-btn"
          onClick={() =>
            onConfirm(slot._id, quantity)
          }
        >
          Confirm Booking
        </button>

        <button
          className="close-btn"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default BookingModal;