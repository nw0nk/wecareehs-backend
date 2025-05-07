import React from "react";
import "./Emergency.css";

const Emergency: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container emergency-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Emergency Preparedness</h1>
            <p className="banner-subtitle">Proactively planning and managing emergencies effectively</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Types of Emergencies</li>
              <li>Legal Requirements of Emergency Preparedness</li>
              <li>Consequences of Being Unprepared</li>
              <li>Components of Emergency Plan</li>
              <li>Roles and Responsibilities of Emergency Team</li>
              <li>Emergency Kit and Communication Strategies</li>
              <li>Fire Fighting Techniques</li>
              <li>Preparation of Emergency Plan</li>
              <li>Creation of Rescue Teams</li>
              <li>Roles and Responsibilities</li>
              <li>Safe Shut-down and Start-up Procedures</li>
              <li>Dos and Don’ts in case of Emergency</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Emergency;
