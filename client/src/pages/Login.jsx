import "../styles/auth.css";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      toast.success("Login Successful");

      navigate("/booking");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

return (
  <div className="auth-container">

    <div className="auth-card">

      <h1>Reservation System</h1>

      <p>Welcome Back 👋</p>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

      <div className="auth-footer">

        Don't have an account?{" "}

        <Link to="/register">
          Register
        </Link>

      </div>

    </div>

  </div>
);
};

export default Login;