import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        Reach out to us with any questions, feedback, or inquiries. Our team is here to help and will get back to you as soon as possible.
      </p>

      <div className="contact-info">
  
        <div className="info-item">
          <h2>Whatsapp / Phone </h2>
          <p>+91 8657181972</p>
        </div>
        <div className="info-item">
          <h2>Email</h2>
          <p>wecareehs@gmail.com</p>
        </div>
      </div>

      <h2 className="form-title">Send Us a Message</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" className="form-input" required />
        <input type="email" placeholder="Your Email" className="form-input" required />
        <textarea placeholder="Your Message" className="form-textarea" required></textarea>
        <button type="submit" className="form-button">Submit</button>
      </form>

      <h2 className="feedback-title">We Value Your Feedback</h2>
      <div className="feedback-section">
        <p>How would you rate your experience with us?</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`star ${index <= rating ? 'selected' : ''}`}
              onClick={() => handleRating(index)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
