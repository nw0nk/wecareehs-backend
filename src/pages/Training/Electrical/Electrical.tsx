import React from "react";
import "./Electrical.css";

const Electrical: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container electrical-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Electrical Safety</h1>
            <p className="banner-subtitle">Preventing electrical hazards and ensuring safe work practices</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Working of Electricity</li>
              <li>Terms in Electricity</li>
              <li>Types of Current and Voltage</li>
              <li>Electrical Accident and Injuries</li>
              <li>Classification of Electrical Hazards</li>
              <li>Importance of Electrical Earthing</li>
              <li>Electrical Protective Devices</li>
              <li>Electrical Protection Methods</li>
              <li>Inspection of Power Equipment</li>
              <li>Electrical Safety Rules</li>
              <li>Lockout and Tagging of Circuits</li>
              <li>Correct Use of PPE</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Electrical;
