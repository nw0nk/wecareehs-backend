import React from "react";
import "./ISO45001.css";

const ISO45001: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container iso45001-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">ISO 45001 Auditor</h1>
            <p className="banner-subtitle">Ensuring occupational health and safety compliance</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to ISO 45001:2018</li>
              <li>Key Principles and Aim of ISO 45001:2018</li>
              <li>OH&S PDCA Cycle</li>
              <li>Structure of ISO 45001:2018</li>
              <li>Consultation and Participation of Workers</li>
              <li>Hazard Identification and Risk Assessment</li>
              <li>HIRA Risk Ranking and Assessment Matrix</li>
              <li>Determination of Legal Requirements</li>
              <li>Determination of Significant Hazards</li>
              <li>Safety Hierarchy of Control</li>
              <li>Safe Operating Procedure</li>
              <li>Management of Change</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ISO45001;
