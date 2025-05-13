import React from "react";
import "./HIRA.css";

const HIRA: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container hira-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">HIRA and Control Methods</h1>
            <p className="banner-subtitle">Ensuring hazard identification and risk management</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Identification of Hazard</li>
              <li>Exposure to Hazard</li>
              <li>Routine and Non-routine Activity</li>
              <li>Event and Consequence</li>
              <li>HIRA Methodology</li>
              <li>Risk Rating Matrix</li>
              <li>Criteria for Likelihood and Severity</li>
              <li>Risk Priority Number</li>
              <li>Assessment of Risk</li>
              <li>Risk Management</li>
              <li>Hazard Identification Tools</li>
              <li>Change Management</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HIRA;
