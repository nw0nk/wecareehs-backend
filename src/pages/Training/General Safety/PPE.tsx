import React from "react";
import "./PPE.css";

const PPE: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container ppe-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">PPE & Its Correct Use</h1>
            <p className="banner-subtitle">Ensuring safety through proper PPE</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Various Industrial Processes</li>
              <li>Understanding Workplace Hazards</li>
              <li>Unsafe Workplace and Housekeeping</li>
              <li>Unsafe Act and Unsafe Condition</li>
              <li>Types of Accident and Injuries</li>
              <li>Need of PPE</li>
              <li>Types of PPE</li>
              <li>Proper Selection of PPE</li>
              <li>Regulatory Standards for PPE</li>
              <li>Proper Use of PPE</li>
              <li>Maintenance and Care</li>
              <li>Encouraging a Safety Culture</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PPE;
