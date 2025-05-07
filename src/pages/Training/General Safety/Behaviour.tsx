import React from "react";
import "./Behaviour.css";

const Behaviour = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container behaviour-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Behaviour Based Safety</h1>
            <p className="banner-subtitle">Building a culture of safety through behaviour</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Requirement of Safety Behaviour</li>
              <li>Evolution and Relevance</li>
              <li>Preparing The Organization</li>
              <li>BBS Process and Techniques</li>
              <li>Identifying Personalities and Attributes</li>
              <li>Types of Behaviour and Pattern</li>
              <li>Challenges and Solutions</li>
              <li>Achieving Safety Behaviour</li>
              <li>Steps in BBS Process</li>
              <li>Benefits of Implementing BBS</li>
              <li>Preparing BBS Checklist and Auditing</li>
              <li>Summarizing Data and Determining Actions</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Behaviour;
