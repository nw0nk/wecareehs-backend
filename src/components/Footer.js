import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll visibility handler
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">WeCare EHS</h3>
            <p className="footer-description">
              Professional EHS training solutions with multi-language support 
              and customized learning programs.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="section-heading">Quick Links</h4>
            <div className="footer-nav">
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/courses" className="nav-link">Courses</Link>
              <Link to="/feedback" className="nav-link">Feedback</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/privacy" className="nav-link">Privacy</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-heading">Connect</h4>
            <div className="social-container">
              <a href="https://m.facebook.com/profile.php?id=61574926660055" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/wecareehs?utm_source=qr&igsh=cnc2ZXV2bGRhcHE2" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com/@wecareehs?feature=shared" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="http://www.linkedin.com/in/wecareehs" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; 2025 WeCare EHS. All rights reserved.</p>
        </div>

        {isVisible && (
          <button 
            className="scroll-top" 
            onClick={scrollToTop} 
            aria-label="Scroll to top"
          >
            <FaArrowUp className="scroll-icon" />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;