import React from "react";
import "./HeatColdStress.css";

const HeatColdStress: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container heatcold-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Heat and Cold Stress</h1>
            <p className="banner-subtitle">Understanding and Managing Temperature-related Risks</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Definitions of Heat and Cold Stress</li>
              <li>Causes of Heat and Cold Stress</li>
              <li>Symptoms of Heat and Cold Stress</li>
              <li>Prevention of Heat and Cold Stress</li>
              <li>Response</li>
              <li>Training Needs</li>
              <li>Use of PPE</li>
              <li>Monitoring</li>
              <li>Emergency Plans</li>
              <li>Handling of Patient</li>
              <li>Handling of Stretcher</li>
              <li>Hands-on Practical</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeatColdStress;
    