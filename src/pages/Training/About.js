import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="about-title">About Us</h1>
        
      </header>

      <section className="about-intro">
        <p className="about-text">
          We are a dedicated team of professionals, passionate about offering exceptional and high-quality services to our customers.<br></br>
          We aim to exceed expectations, foster long-lasting relationships, and contribute positively to the Indian industry.
        </p>
        
      </section>
      <section className="history-section">
        <h2 className="section-title">Our Vision</h2>
        <p className="about-text">
        To create “Safe, Healthy & Accident-free Workplace” by enhancing Environment, Health and Safety competency amongst the employees and compliance thereof. Our objective is to influence the industry and society by increasing overall awareness about Environment, Occupational Health, and Safety aspects by reducing the industrial accidents, damage to health and property and drain to national economy.
        </p>
        <p className="about-text">
          Today, we are proud of our journey and excited about the future. We continue to evolve, innovate, and expand our services to meet the changing needs of our clients. Our work is a reflection of our commitment to excellence, fueling our passion to achieve even greater heights.
        </p>
      </section>

      <section className="mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="about-text">
          •	Safe, Healthy & Accident-free workplace environment for all <br></br>
          •	Distinctive approach to success of industry in Health and Safety<br></br>
          •	Sustainable solutions for Environment and Business<br></br>
          •	Competent and Experienced support for EHS Management system<br></br>
          •	Environment, Health and Safety Competency Building in industry and society<br></br>

        </p>

      </section>

      

     

 
      <section className="commitment-section">
        <h2 className="section-title">Our Commitment</h2>
        <p className="about-text">
          We are committed to continuous improvement and upholding the highest standards of quality in everything we do. Our clients trust us because we deliver consistent results and foster relationships built on transparency and reliability.
        </p>
        <p className="about-text">
          As we move forward, we pledge to stay true to our mission and values, maintaining our focus on integrity, quality, and customer satisfaction.
        </p>
      </section>


    </div>
  );
}

export default About;
