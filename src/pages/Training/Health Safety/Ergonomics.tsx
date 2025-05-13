import React from "react";
import "./Ergonomics.css";

const Ergonomics: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container ergonomics-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Workplace Ergonomics</h1>
            <p className="banner-subtitle">Enhancing comfort and safety in the workplace</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to Ergonomics</li>
              <li>Key Principles of Ergonomics</li>
              <li>Anatomy of the Human Body</li>
              <li>Common Ergonomic Risk Factors</li>
              <li>Safe Manual Material Handling Methods</li>
              <li>Ergonomic Related Injuries</li>
              <li>Musculoskeletal Diseases</li>
              <li>Fit to Human</li>
              <li>Ergonomic Assessment</li>
              <li>Ergonomic Solutions</li>
              <li>Training and Education</li>
              <li>Support from Management</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Ergonomics;
