import React from "react";
import "./WorkingAtHeight.css";

const WorkingAtHeight: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container height-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Working at Height Safety</h1>
            <p className="banner-subtitle">Minimizing risks while working at elevated heights</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Need of Working at Height</li>
              <li>Regulatory Standards</li>
              <li>Types and Reasons of Accident</li>
              <li>Unsafe Act and Unsafe Condition</li>
              <li>Health and Wellness</li>
              <li>Working with Ladders</li>
              <li>Working with Scaffolding</li>
              <li>Working with Lifeline</li>
              <li>PPE and its Correct Use</li>
              <li>Hazard Communication and Rescue</li>
              <li>Inspection of Ladder/ Scaffolding/ Lifeline</li>
              <li>Site Safety Management</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WorkingAtHeight;
