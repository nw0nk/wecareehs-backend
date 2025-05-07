import React from "react";
import "./Mental.css";

const Mental: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container mental-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Mental Wellbeing</h1>
            <p className="banner-subtitle">Creating a healthier mind for a better life</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to Mental Wellbeing</li>
              <li>Understanding Mental Health</li>
              <li>Factors Affecting Mental Wellbeing</li>
              <li>Stress and Overstress</li>
              <li>Signs and Symptoms of Mental Health Issues</li>
              <li>Health Issues due to Stress</li>
              <li>Promoting Mental Wellbeing</li>
              <li>Work-life Balance</li>
              <li>Building a Supportive Environment</li>
              <li>Training and Education</li>
              <li>Stress Management</li>
              <li>Meditation</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Mental;
