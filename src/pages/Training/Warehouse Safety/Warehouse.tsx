import React from "react";
import "./Warehouse.css";

const Warehouse: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-4">
      
      {/* Banner Section */}
      <div className="banner-container warehouse-banner">
        <div className="banner-overlay"></div>

        {/* Content inside the banner */}
        <div className="banner-content">
          {/* Title & Subtitle */}
          <div className="banner-text">
            <h1 className="banner-title">Warehouse Safety</h1>
            <p className="banner-subtitle">Ensuring safe and efficient warehouse operations</p>
          </div>

          {/* Key Points - Aligned to the Right */}
          <div className="banner-keypoints">
            <ul>
              <li>Significance and Functions of Warehouse</li>
              <li>Warehouse Layout Design</li>
              <li>Emergency Preparedness</li>
              <li>Storage Space and Mechanism</li>
              <li>Illumination and Ventilation</li>
              <li>Loading, Unloading and Stacking</li>
              <li>Material Handling Methods and Equipment</li>
              <li>Safe Driving of MHE</li>
              <li>Packing Material and Process</li>
              <li>Transportation of Goods and Vehicles</li>
              <li>Maintenance of Machineries</li>
              <li>Sustainable Warehouse</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Warehouse;
