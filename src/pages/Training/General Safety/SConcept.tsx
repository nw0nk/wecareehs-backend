import React from "react";
import "./SConcept.css";

const SConcept = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container s5-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">5S Concepts</h1>
            <p className="banner-subtitle">Organizing Workplace to reduce Accidents </p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Meaning of 5S</li>
              <li>Benefits of 5S</li>
              <li>Four Key Points of 5S</li>
              <li>Priority Classification</li>
              <li>Red Tag System</li>
              <li>1S – Seiri (Sort)</li>
              <li>2S - Seiton (Set in Order)</li>
              <li>3S - Seiso (Shine)</li>
              <li>4S - Seiketsu (Standardize)</li>
              <li>5S - Shitsuke (Sustain)</li>
              <li>Preparing Checklist</li>
              <li>Practicing 5S at Workplace</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SConcept;
