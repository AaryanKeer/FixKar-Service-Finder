import { useState, useEffect } from "react";
import "../styles/MainPage.css"; // Import styles

import electricServ from "../assets/electrical service.jpg";
import plumbingServ from "../assets/plumbing service.jpg";
import paintingServ from "../assets/painting service.jpg";
import gardeningServ from "../assets/gardening service.jpg";
import carServ from "../assets/car repair service.jpg";
import photographyServ from "../assets/photography service.jpg";

// ✅ FIX: Add this missing images array
const images = [electricServ, plumbingServ, paintingServ, gardeningServ, carServ, photographyServ];

const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const services = [
    "Plumbing", "Electric", "Appliance Repair", "Gardening & Landscaping",
    "Cleaning Services", "Carpenter", "Painting & Decorating",
    "Home Renovation", "Pool Cleaning", "Automotive Services",
    "Childcare & Babysitting", "Elderly Care", "Photography/Videography",
    "Tutoring & Educational Services", "Legal Consulting",
    "Wedding Services", "Event Planning & Catering"
  ];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Hyderabad", "Pune"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main-container">
      {/* Slider Section */}
      <section className="slider">
        <div className="slides">
          {images.map((img, index) => (
            <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}>
          &#10094;
        </button>
        <button className="next" onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}>
          &#10095;
        </button>
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Service Search Section */}
      <section className="service-search">
        <h2>Find the Best Services Near You</h2>
        <div className="search-form">
          <select>
            <option value="">Select Service</option>
            {services.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
          <select>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          <button className="search-btn">Search</button>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
