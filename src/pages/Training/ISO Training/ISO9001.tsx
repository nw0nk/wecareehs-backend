import React from "react";
import "./ISO9001.css";

const ISO9001: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container iso9001-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">ISO 9001 Auditor</h1>
            <p className="banner-subtitle">Ensuring quality management and compliance</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to ISO 9001:2015</li>
              <li>Key Principles of ISO 9001:2015</li>
              <li>Quality Management System</li>
              <li>Quality PDCA Cycle</li>
              <li>Structure of ISO 9001:2015 and Clauses</li>
              <li>Internal and External Factors</li>
              <li>Turtle Chart</li>
              <li>Risk-based Thinking!</li>
              <li>Process Mapping</li>
              <li>ISO Documentation</li>
              <li>Implementation of ISO 9001:2015</li>
              <li>Certification Process</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ISO9001;
