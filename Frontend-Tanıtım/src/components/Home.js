import React from "react";
import "../styles/Home.css";
import bilkentLogo from '../assets/bilkent-logo.png';
import campusImage from '../assets/campus-image.jpg';
import { Link } from 'react-router-dom'; // React Router Link



const Home = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <img src={bilkentLogo} alt="Bilkent Logo" className="home-bilkent-logo" />
        <div className="logo">Bilkent University</div>
        <nav className="nav-links">
          <button onClick={() => scrollToSection("home")}>Home</button>
          <button onClick={() => scrollToSection("apply")}>Apply</button>
          <button onClick={() => scrollToSection("courses")}>Courses</button>
          <button onClick={() => scrollToSection("faqs")}>FAQs</button>
          <button onClick={() => scrollToSection("about")}>About Us</button>
        </nav>
        <div className="header-buttons">
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
      </div>
        </header>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <img src={campusImage} alt="Campus" className="hero-image" />

        <div className="hero-text">
          <h1>Find Your Future Today!</h1>
          <p>Your Gateway to World-Class Education</p>
          <button className="get-started-button">Get Started</button>
        </div>
      </section>

      {/* Information Section */}
      <section id="apply" className="info-section">
        <p>
        Explore a vibrant and dynamic campus at Bilkent University. With renowned academic programs, 
        innovative research opportunities, and a global community, Bilkent provides the ideal environment 
        to shape your future. Our comprehensive guide offers insights into our top-ranked programs, unique 
        facilities, and student life. Whether you're intserested in science, the arts, or business, you'll find 
        the perfect fit here at Bilkent. Start your journey today and take the first step towards achieving your dreams.
        </p>
      </section>

      {/* Action Boxes */}
      <section className="action-boxes">
        <div className="action-card">
          <h3>Apply for a Tour</h3>
          <p>Book a guided tour and discover Bilkent’s academic and social life.</p>
          <div className="action-buttons">
            <Link to="/highschool">
              <button>High School</button>
            </Link>
            <button>Individual</button>
          </div>
        </div>
        <div className="action-card">
          <h3>Invite Bilkent to Your Fair</h3>
          <p>Invite Bilkent representatives to your school or event.</p>
          <button>Get Started</button>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <h2>Most Popular Courses</h2>
        <div className="course-cards">
          <div className="course-card">
            <h3>Industrial Engineering</h3>
            <p>See Course Guide →</p>
          </div>
          <div className="course-card">
            <h3>Computer Engineering</h3>
            <p>See Course Guide →</p>
          </div>
          <div className="course-card">
            <h3>Business Management</h3>
            <p>See Course Guide →</p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <h2>We’re Here to Help</h2>
        <p>If you have any questions or need assistance, we’re here for you.</p>
        <div className="support-options">
          <button className="support-button">Read FAQs</button>
          <button className="support-button">Ask a Question</button>
        </div>
      </section>


      {/* Footer Section */}
<footer className="footer">
  <div className="newsletter">
    <h3>Subscribe to our Newsletter</h3>
    <p>Get expert advice for your journey to university delivered to your inbox each month. It's short, and worthwhile - we promise!</p>
    <input type="email" placeholder="Enter your email" className="newsletter-input" />
    <div>
      <input type="checkbox" id="terms" />
      <label htmlFor="terms">I confirm I am over 16 and agree to the Terms and Conditions.</label>
    </div>
    <button className="newsletter-button">Subscribe Now</button>
  </div>
  <div className="footer-links">
  <a href="/about">About</a>
  <a href="/contact">Contact Us</a>
  <a href="/faqs">FAQs</a>
  <a href="/terms-and-conditions">Terms and Conditions</a>
  <a href="/cookie-policy">Cookie Policy</a>
  <a href="/privacy">Privacy</a>
</div>

      <p className="copyright">Copyright Claim</p>
    </footer>
    </div>
  );
};

export default Home;
