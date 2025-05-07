import React from "react";
import "./Construction.css";

const Construction: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container construction-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Construction Safety</h1>
            <p className="banner-subtitle">Ensuring safety in high-risk construction environments</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction To Construction Safety</li>
              <li>Regulatory Standards</li>
              <li>Types And Reasons of Accident</li>
              <li>Unsafe Act and Unsafe Condition</li>
              <li>Excavation Work</li>
              <li>Confined Space</li>
              <li>Working At Height</li>
              <li>Electrical Safety</li>
              <li>Fabrication Work</li>
              <li>PPE and Its Correct Use</li>
              <li>Construction Machinery Safety</li>
              <li>Site Safety Management</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Construction;
