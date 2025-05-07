import React from "react";
import "./LOTO.css";

const LOTO: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container loto-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">LOTO (Lock Out Tag Out)</h1>
            <p className="banner-subtitle">Ensuring safety through Hazardous Energy Control</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to LOTO</li>
              <li>Regulatory Standards</li>
              <li>Types of Hazardous Energy</li>
              <li>Significance of Work Permit</li>
              <li>Types of LOTO Equipment</li>
              <li>Selection of Correct LOTO</li>
              <li>LOTO Procedures</li>
              <li>Removal of Lockout Devices</li>
              <li>Training and Responsibilities</li>
              <li>Common LOTO Violations</li>
              <li>Review and Assessment</li>
              <li>Encouraging a Safety Culture</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LOTO;
