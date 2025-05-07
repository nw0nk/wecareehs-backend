import React from "react";
import "./Crane.css";

const Crane: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container crane-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Crane Safety</h1>
            <p className="banner-subtitle">Ensuring safe and efficient crane operations</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Material Handling Methods</li>
              <li>Need and Types of Cranes</li>
              <li>Working Principle of Crane</li>
              <li>Selection of Correct Crane</li>
              <li>Selection of Tools and Tackles</li>
              <li>Checkpoints of Crane</li>
              <li>Safe Material Handling using Crane</li>
              <li>Stacking of Goods</li>
              <li>Transportation of Goods</li>
              <li>Loading and Unloading of Goods</li>
              <li>People Movement</li>
              <li>Periodic Maintenance</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Crane;
