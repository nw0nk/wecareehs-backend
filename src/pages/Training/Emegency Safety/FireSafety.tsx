import React from "react";
import "./FireSafety.css";

const FireSafety: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container fire-safety-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Fire Safety with Practical</h1>
            <p className="banner-subtitle">Understanding fire hazards and effective response techniques</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Types of Emergencies</li>
              <li>Emergency Contact Numbers</li>
              <li>Basic Elements of Fire</li>
              <li>Fire Fighting - Chemistry of Fire</li>
              <li>Causes and Types of Fire</li>
              <li>Methods of Extinguishing Fire</li>
              <li>Types of Fire Detection Systems</li>
              <li>Types of Fire Protection and Usages</li>
              <li>Types and Use of Fire Extinguisher</li>
              <li>Basic Elements and Use of Fire Hydrant</li>
              <li>Behaviour during Emergency</li>
              <li>Hands-on Practical</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FireSafety;
