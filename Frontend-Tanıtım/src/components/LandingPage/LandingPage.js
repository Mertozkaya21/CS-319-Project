import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import styles from './LandingPage.module.css';
import campusImage from "../../assets/campus-image.jpg";
import bilkentLogo from '../../assets/bilkent-logo.png';
import { fadeInUp, fadeInLeft, fadeInRight, bounceIn, scaleOnHover, wiggle, staggerContainer, slideInLeft, slideInRight } from './animations';
import studentsWorking from '../../assets/students-working.png';
import { NavLink } from 'react-router-dom';
import computerEngineering from '../../assets/courses/computer-engineering.jpeg';
import industrialEngineering from '../../assets/courses/industrial-engineering.jpeg';
import businessManagement from '../../assets/courses/business-management.jpeg';
import helpImage from '../../assets/help-image.png';
import { Facebook, Instagram, YouTube, Twitter, Email } from '@mui/icons-material';
const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logoContainer}>
            <motion.img 
            src={bilkentLogo} 
            alt="Bilkent Logo" 
            className={styles.logo}
            variants={wiggle}
            whileHover="hover"
            />
            <span className={styles.logoText}>Tanıtım Ofisi</span>
        </div>
        <nav>
            <ul>
            <motion.li variants={scaleOnHover} whileHover="hover"><a href="#home">Home</a></motion.li>
            <motion.li variants={scaleOnHover} whileHover="hover"><a href="#apply">Apply</a></motion.li>
            <motion.li variants={scaleOnHover} whileHover="hover"><a href="#courses">Courses</a></motion.li>
            <motion.li variants={scaleOnHover} whileHover="hover"><a href="#faqs">FAQs</a></motion.li>
            <motion.li variants={scaleOnHover} whileHover="hover"><a href="#about">About Us</a></motion.li>
            </ul>
        </nav>
        <div>
            <NavLink to="/login">
            <Button variant="outlined" className={styles.loginBtn}>Login</Button>
            </NavLink>
        </div>
        </header>

      {/* Hero Section */}
      <section className={styles.heroSection} id="home" style={{ backgroundImage: `url(${campusImage})` }}>
      <motion.div
          className={styles.heroContent}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            Find Your <span className={styles.heroHighlight}>Future</span> Today!
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
            Your Gateway to World-Class Education
          </motion.p>
          <motion.div variants={fadeInUp}>
            <a 
              href="https://w3.bilkent.edu.tr/bilkent/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="contained" className={styles.getStartedBtn}>
                Get Started
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

        {/* Introduction Section */}
        <section className={styles.introSection}>
        <motion.div
            className={styles.introContent}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
        >
            <motion.p variants={fadeInUp} className={styles.introText}>
            Explore a vibrant and dynamic campus at Bilkent University. With renowned academic programs, innovative research opportunities, and a global community, 
            Bilkent provides the ideal environment to shape your future. Our comprehensive guide offers 
            insights into our top-ranked programs, unique facilities, and student life. Whether you're 
            interested in science, the arts, or business, you'll find the perfect fit here at Bilkent. 
            Start your journey today and take the first step towards achieving your dreams.
            </motion.p>
            <motion.div variants={fadeInUp}>
            </motion.div>
        </motion.div>
        </section>

      {/* Tour and Fair Cards */}
      <section className={styles.cardsSection} style={{ backgroundImage: `url(${studentsWorking})` }}  id="apply">
        <motion.div
          className={styles.cardsContainer}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Apply for a Tour Card */}
          <motion.div variants={fadeInLeft} className={styles.card}>
            <div className={styles.cardIcon}>
              <span role="img" aria-label="calendar">📅</span>
            </div>
            <h3>Apply for a Tour</h3>
            <p>Book a guided tour and discover Bilkent's academic and social life.</p>
            <div className={styles.cardLinks}>
              <NavLink to="/highschoolform" className={styles.cardLink}>High School →</NavLink>
              <NavLink to="/individualform" className={styles.cardLink}>Individual →</NavLink>
            </div>
          </motion.div>

          {/* Invite Bilkent to Your Fair Card */}
          <motion.div variants={fadeInRight} className={styles.card}>
            <div className={styles.cardIcon}>
              🏠
            </div>
            <h3>Invite Bilkent to your Fair</h3>
            <p>Invite Bilkent representatives to your school or event.</p>
            <a 
              href="https://w3.bilkent.edu.tr/bilkent/about-bilkent/contact-us/" 
              className={styles.cardLink}
            >
              Invite →
            </a>
          </motion.div>
        </motion.div>
      </section>

    {/* Courses Section */}
    <section className={styles.coursesSection} id="courses">
    <motion.div
        className={styles.coursesContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        <motion.h2 variants={fadeInUp} className={styles.coursesTitle}>
        Most Popular Programs
        </motion.h2>
        <motion.div variants={fadeInUp} className={styles.titleUnderline}></motion.div>
        
        <div className={styles.coursesGrid}>
        {/* Graphic Design */}
        <motion.div 
            variants={slideInLeft} 
            className={styles.courseCard}
            whileHover={{ scale: 1.05 }}
        >
            <img src={industrialEngineering} alt="Graphic Design" />
            <h3>Graphic Design</h3>
            <a 
            href="http://gra.bilkent.edu.tr/?lang=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.courseLink}
            >
            SEE COURSE GUIDE →
            </a>
        </motion.div>

        {/* Computer Engineering */}
        <motion.div 
            variants={fadeInUp} 
            className={styles.courseCard}
            whileHover={{ scale: 1.05 }}
        >
            <img src={computerEngineering} alt="Computer Engineering" />
            <h3>Computer Engineering</h3>
            <a 
            href="https://w3.cs.bilkent.edu.tr/tr/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.courseLink}
            >
            SEE COURSE GUIDE →
            </a>
        </motion.div>

        {/* Business Management */}
        <motion.div 
            variants={slideInRight} 
            className={styles.courseCard}
            whileHover={{ scale: 1.05 }}
        >
            <img src={businessManagement} alt="Business Management" />
            <h3>Business Management</h3>
            <a 
            href="https://www.google.com/search?client=safari&rls=en&q=bilkent+business+management&ie=UTF-8&oe=UTF-8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.courseLink}
            >
            SEE COURSE GUIDE →
            </a>
        </motion.div>
        </div>

        <motion.div variants={fadeInUp} className={styles.seeAllButtonWrapper}>
        <a 
            href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://w3.bilkent.edu.tr/bilkent/faculties-and-departments/&ved=2ahUKEwjG2Lrl8bmKAxW9cfEDHRAEIZIQFnoECAoQAQ&usg=AOvVaw3wlXX90WxWZNitEiHoscW2" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <Button variant="outlined" className={styles.seeAllBtn}>
            SEE ALL →
            </Button>
        </a>
        </motion.div>
    </motion.div>
    </section>

    {/* FAQs Section */}
    <section className={styles.faqSection} id="faqs">
    <motion.div
        className={styles.faqContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        {/* FAQ Image */}
        <motion.div variants={slideInLeft} className={styles.faqImage}>
        <img src={helpImage} alt="Help Section" />
        </motion.div>

        {/* FAQ Content */}
        <motion.div variants={slideInRight} className={styles.faqContent}>
        <h2>We're here to help</h2>
        <p>
            Read through our FAQs and, if you can't find what you're looking for, 
            our experts will be happy to answer your questions.
        </p>
        <div className={styles.faqButtons}>
            <a 
            href="https://w3.bilkent.edu.tr/bilkent/international-center/frequently-asked-questions/" 
            target="_blank" 
            rel="noopener noreferrer"
            >
            <Button variant="contained" className={styles.readFaqsBtn}>
                READ FAQS
            </Button>
            </a>
            <a 
            href="https://w3.bilkent.edu.tr/bilkent/about-bilkent/contact-us/#:~:text=If%20you%20have%20further%20questions,or%20use%20the%20form%20below." 
            target="_blank" 
            rel="noopener noreferrer"
            >
            <Button variant="text" className={styles.askQuestionBtn}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                <Email style={{ marginRight: '5px' }} />
                ASK A QUESTION
                </span>
            </Button>
            </a>
        </div>
        </motion.div>
    </motion.div>
    </section>

    {/* About Us Section */}
    <footer className={styles.aboutSection} id="about">
    <motion.div
        className={styles.aboutContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        <motion.h2 variants={fadeInUp} className={styles.aboutTitle}>
        Get Latest News
        </motion.h2>
        <motion.p variants={fadeInUp} className={styles.aboutSubtitle}>
        Stay updated with the latest news and announcements from Bilkent University.
        </motion.p>
        <motion.div variants={fadeInUp} className={styles.aboutButtonWrapper}>
        <a 
            href="https://bilkentnews.bilkent.edu.tr/" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <Button variant="contained" className={styles.subscribeBtn}>
            GET LATEST NEWS
            </Button>
        </a>
        </motion.div>
        
        {/* Social Media Links with Icons */}
        <motion.div variants={fadeInUp} className={styles.socialLinks}>
        <a href="https://www.facebook.com/BilkentUniversitesi/" target="_blank" rel="noopener noreferrer">
            <Facebook className={styles.socialIcon} />
        </a>
        <a href="https://www.instagram.com/bilkentuniv/" target="_blank" rel="noopener noreferrer">
            <Instagram className={styles.socialIcon} />
        </a>
        <a href="https://www.youtube.com/user/BilkentUniversitesi" target="_blank" rel="noopener noreferrer">
            <YouTube className={styles.socialIcon} />
        </a>
        <a href="https://x.com/BilkentUniv" target="_blank" rel="noopener noreferrer">
            <Twitter className={styles.socialIcon} />
        </a>
        </motion.div>

        {/* Footer Links */}
        <motion.div variants={fadeInUp} className={styles.footerLinks}>
        <a 
            href="https://w3.bilkent.edu.tr/web/ogrencibrosurleri/2023_2024_Bilkent_Ogrenci_Kilavuzu_EN.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            Student Handbook
        </a>
        <a 
            href="https://www.bilkent.edu/bilkent/academic-regulations-and-rules/" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            Academic Rules
        </a>
        </motion.div>
        <motion.p variants={fadeInUp} className={styles.copyright}>
        © 2024 Bilkent University. All rights reserved.
        </motion.p>
    </motion.div>
    </footer>

      {/* Spacer Section to Test Scrolling */}
      <div className={styles.spacer}></div>
    </div>
  );
};

export default LandingPage;