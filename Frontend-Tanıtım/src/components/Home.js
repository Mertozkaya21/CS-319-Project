import React from "react";
import "../styles/Home.css";
import bilkentLogo from '../assets/bilkent-logo.png';
import campusImage from '../assets/campus-image.jpg';
import students from '../assets/students-working.png';


import { Link } from 'react-router-dom'; // React Router Link



const Home = () => {
  return (
    <div>
      {/* Header Section */}
        <header className="header">
          <div className="header-left">
            {/* Logo */}
            <img src={bilkentLogo} alt="Bilkent Logo" className="home-bilkent-logo" />
            {/* Navigation Menu */}
            <nav className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/apply" className="nav-link">Apply</Link>
              <Link to="/courses" className="nav-link">Courses</Link>
              <Link to="/faqs" className="nav-link">FAQs</Link>
              <Link to="/about" className="nav-link">About Us</Link>
            </nav>
          </div>
          <div className="header-buttons">
            <Link to="/login">
              <button className="login-button">Log In</button>
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
      <section
        className="action-boxes"
        style={{ backgroundImage: `url(${students})` }}
      >
        <div className="action-card">
          <h3>Apply for a Tour</h3>
          <p>Book a guided tour and discover Bilkent’s academic and social life.</p>
          <div className="action-buttons">
            <Link to="/highschool">
              <button>High School</button>
            </Link>
            <Link to="/individual"> 
              <button>Individual</button>
            </Link>
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
          {/* Industrial Engineering */}
          <div className="course-card">
            <img 
          src={require('../assets/courses/industrial-engineering.jpeg')} 
          alt="Industrial Engineering" 
          className="course-image"
        />
            <h3>Industrial Engineering</h3>
            <p>See Course Guide →</p>
          </div>
          <div className="course-card">
            {/* Computer Engineering */}
              <img 
          src={require('../assets/courses/computer-engineering.jpeg')} 
          alt="Computer Engineering" 
          className="course-image"
        />
            <h3>Computer Engineering</h3>
            <p>See Course Guide →</p>
          </div>
          <div className="course-card">
            <img 
          src={require('../assets/courses/business-management.jpeg')} 
          alt="Business Management" 
          className="course-image"
        />
            <h3>Business Management</h3>
            <p>See Course Guide →</p>
          </div>
        </div>
            <div className="see-all-button">
        <button>See All →</button>
      </div>
      </section>

      {/* Support Section */}
      <section className="help-section">
        <div className="help-container">
      {/* Left Image */}
      <div className="help-image-container">
        <img src={require('../assets/help-image.png')} alt="Helping students" className="help-image" />
      </div>
      {/* Right Content */}
      <div className="help-content">
        <h2>We’re here to help</h2>
        <p>
          Read through our FAQs and, if you can't find what you're looking for, our experts 
          will be happy to answer your questions.
        </p>
        <div className="help-buttons">
          <button className="help-button faqs-button">READ FAQs</button>
          <button className="help-button ask-question-button">ASK A QUESTION</button>
        </div>
      </div>
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