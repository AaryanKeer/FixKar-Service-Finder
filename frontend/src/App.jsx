import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserHome from "./pages/UserHome"; // Page after user login
import AdminHome from "./pages/AdminHome"; // Page after admin login
import MainPage from "./components/MainPage"; // MainPage

const App = () => {
  const [userRole, setUserRole] = useState(null); // Track user role
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (Replace with actual auth logic)
    const storedUserRole = localStorage.getItem("userRole"); // Example storage
    setUserRole(storedUserRole);
  }, []);

  return (
    <>
      <Navbar userRole={userRole} />
      <Routes>
        {/* Conditionally show home page based on login status */}
        <Route
          path="/"
          element={
            userRole === "admin" ? (
              <AdminHome />
            ) : userRole === "user" ? (
              <UserHome />
            ) : (
              <>
                <Home />
                <MainPage /> {/* Add MainPage for unauthenticated users */}
              </>
            )
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
