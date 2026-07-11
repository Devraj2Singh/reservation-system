import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
      const { data } = await API.post("/auth/register", formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      toast.success("Registration Successful");

      navigate("/booking");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

 return (
  <div className="auth-container">

    <div className="auth-card">

      <h1>Create Account</h1>

      <p>Book your reservation easily</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>

      </form>

      <div className="auth-footer">

        Already have an account?{" "}

        <Link to="/">
          Login
        </Link>

      </div>

    </div>

  </div>
);
};

export default Register;