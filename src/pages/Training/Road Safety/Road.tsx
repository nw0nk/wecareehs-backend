import React from "react";
import "./Road.css";

const Road: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container road-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Road Safety</h1>
            <p className="banner-subtitle">Ensuring safe driving practices and minimizing risks</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Theory of Motor Vehicles</li>
              <li>Types and Use of Motor Vehicles</li>
              <li>Vehicle Accident Statistics</li>
              <li>Principles of Safe Driving</li>
              <li>Attitude and Behaviour</li>
              <li>Significance of Vehicle Spare Parts</li>
              <li>Various Checks on Car</li>
              <li>Defensive Driving Methods</li>
              <li>Use of SMS or Mobile while Driving</li>
              <li>Health and Wellness</li>
              <li>Written Assignment</li>
              <li>Practical Assignment</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Road;
