import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};

  return (
    <nav className="navbar">
      <h2 className="logo">ReserveX</h2>

      <div className="nav-links">
        <NavLink to="/booking">
          <FaCalendarCheck />
          Booking
        </NavLink>

        <NavLink to="/my-bookings">
          <FaClipboardList />
          My Bookings
        </NavLink>

        <NavLink to="/dashboard">
          <FaChartBar />
          Dashboard
        </NavLink>

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;