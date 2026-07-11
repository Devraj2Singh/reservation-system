import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/booking" element={<Booking />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/dashboard" element={ <AdminRoute> <Dashboard /> </AdminRoute> }/>
      </Route>

    </Routes>
  );
}

export default App;