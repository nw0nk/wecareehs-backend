import React from "react";
import "./SafetyAwareness.css";

const SafetyAwareness = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container2">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Safety Awareness</h1>
            <p className="banner-subtitle">Make Workplace Safe & Achieve Safety Culture</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li> Theory and Types of accidents</li>
              <li> Reasons and Impact of Accident</li>
              <li> Principle of Accident (Domino's Theory)</li>
              <li> Types of Activities</li>
              <li> Unsafe Act and Unsafe Condition</li>
              <li> Methods For Preventing Pollution</li>
              <li> Safety Attitude and Behaviour</li>
              <li> People Movement</li>
              <li> Safe Maintenance</li>
              <li> Safe Material Handling</li>
              <li> Types of Injury</li>
              <li> Safety Management</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SafetyAwareness;
