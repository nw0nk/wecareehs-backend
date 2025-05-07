import React from "react";
import "./FirstAid.css";

const FirstAid: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container firstaid-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">First Aid with Practical</h1>
            <p className="banner-subtitle">Essential lifesaving skills for emergency situations</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to First Aid</li>
              <li>Unconsciousness</li>
              <li>Examination of a Serious Casualty</li>
              <li>Fall from Height</li>
              <li>Burns, Injury, Fracture (General)</li>
              <li>Electric / Cardiac Shock</li>
              <li>Drowning</li>
              <li>Dog/ Snake/ Insect Bite</li>
              <li>CPR</li>
              <li>Dressing and Bandaging</li>
              <li>Handling of Casualty</li>
              <li>Stretcher Drill</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FirstAid;
