import React from "react";
import "./Chemical.css";

const Chemical: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container chemical-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Chemical Safety</h1>
            <p className="banner-subtitle">Understanding and managing chemical hazards in the workplace</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Understanding Chemicals</li>
              <li>Types of Chemicals</li>
              <li>Material Safety Data Sheets (MSDS)</li>
              <li>Regulatory Standards</li>
              <li>Chemicals at Workplace</li>
              <li>Risk Assessment</li>
              <li>Risk Management</li>
              <li>Use of PPE</li>
              <li>Safe Handling and Storage</li>
              <li>Emergency Procedures</li>
              <li>Waste Disposal</li>
              <li>Training and Documentation</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Chemical;
