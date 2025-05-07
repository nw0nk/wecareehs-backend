import React from "react";
import "./ISODocumentation.css";

const ISODocumentation: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container iso-doc-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">ISO Documentation</h1>
            <p className="banner-subtitle">Ensuring structured and compliant ISO documentation</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Purpose of ISO Documentation</li>
              <li>SSPD Evaluation</li>
              <li>Environmental Aspects and Impacts</li>
              <li>HIRA Risk Ranking and Assessment Matrix</li>
              <li>Hazard Identification, Risk Assessment and Control</li>
              <li>Determination of Legal Requirements</li>
              <li>Determination of Significant Aspects and Hazards</li>
              <li>Control of Significant Aspects and Hazards</li>
              <li>Emergency Preparedness</li>
              <li>Safe Operational Procedure</li>
              <li>Life Cycle Perspective</li>
              <li>Document Management</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ISODocumentation;
