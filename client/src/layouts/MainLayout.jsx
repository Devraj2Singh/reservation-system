import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;