import React from "react";
import "./ISO14001.css";

const ISO14001: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container iso14001-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">ISO 14001 Auditor</h1>
            <p className="banner-subtitle">Ensuring environmental safety and compliance</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to ISO 14001:2015</li>
              <li>Key Principles of ISO 14001:2015</li>
              <li>EMS PDCA Cycle</li>
              <li>Structure of ISO 14001:2015</li>
              <li>Environmental Aspects and Impacts</li>
              <li>Safe Operational Procedures</li>
              <li>The Environmental Policy</li>
              <li>Hazardous Waste Management</li>
              <li>Control of Significant Aspects</li>
              <li>Emergency Preparedness</li>
              <li>5R Principle for Environmental Protection</li>
              <li>Life Cycle Perspective</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ISO14001;
