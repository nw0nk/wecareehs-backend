import React from "react";
import "./ISO19011.css";

const ISO19011: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container iso19011-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">ISO 19011 Auditor</h1>
            <p className="banner-subtitle">Ensuring effective auditing and compliance</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Introduction to ISO 19011:2018</li>
              <li>Scope of the Standard</li>
              <li>Types and Process of Audit</li>
              <li>Principles of Auditing</li>
              <li>Managing an Audit Programme</li>
              <li>Audit Objectives and Scope</li>
              <li>Audit Risks and Opportunities</li>
              <li>Audit Programme Resources</li>
              <li>Audit Activities</li>
              <li>Audit Techniques and Skills</li>
              <li>Competence and Behaviour of an Auditor</li>
              <li>Roles and Responsibilities of an Auditor</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ISO19011;
