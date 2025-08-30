import React from "react";
import { Link } from "react-router-dom";
import FeaturesPage from "./FeaturePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1 className="hero-title">Your Adventure Awaits</h1>
            <p>Discover new places and explore the world with WanderMate.</p>
            <Link to="/features" className="btn-hero">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <AboutPage />
      <FeaturesPage />
      <ContactPage />
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 WanderMate. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
