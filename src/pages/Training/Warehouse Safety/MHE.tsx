import React from "react";
import "./MHE.css";

const MHE: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container mhe-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">MHE Driving Safety</h1>
            <p className="banner-subtitle">Ensuring safe operation of material handling equipment</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Material Handling Methods</li>
              <li>Types and Use of MHE</li>
              <li>Working Principle of MHE</li>
              <li>Selection of Correct MHE</li>
              <li>Charging of MHE</li>
              <li>Checkpoints of MHE</li>
              <li>Defensive Driving Methods</li>
              <li>People Movement</li>
              <li>Working at Height and Slope</li>
              <li>Maintenance of MHE</li>
              <li>Transportation</li>
              <li>Loading and Unloading of Goods</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MHE;
