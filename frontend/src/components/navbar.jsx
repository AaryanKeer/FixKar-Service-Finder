import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png"; // Import logo

const Navbar = ({ userRole }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <Link to={userRole === "admin" ? "/admin" : userRole === "user" ? "/user" : "/"}>
            <img src={logo} alt="FixKar Logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/about">How It Works</Link></li>
        </ul>
      </div>
      <div className="nav-actions">
        <Link to="/signup" className="signup-btn">Sign Up</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
