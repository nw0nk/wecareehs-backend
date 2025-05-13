import React from "react";
import "./Environmental.css";

const Environmental = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Environmental Safety</h1>
            <p className="banner-subtitle">Protecting our planet for future generations</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li> Basic Elements of Environment</li>
              <li> Environmental Changes & Hazards</li>
              <li> Past Incidences & Hazards</li>
              <li> Need To Protect Environment</li>
              <li> Types Of Pollution</li>
              <li> Methods For Preventing Pollution</li>
              <li> ISO - 14001 Certification & Its Need</li>
              <li> Environmental Management System</li>
              <li> Significant Aspects and Control</li>
              <li> Operation Control Procedures</li>
              <li> Purpose of EMS</li>
              <li> Responsibility in EMS</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Environmental;
