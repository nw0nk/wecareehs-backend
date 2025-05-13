import React from 'react';
import './EHSShiksha.css';

function EHSShiksha() {
  return (
    <div className="ehs-container">
      <h1 className="ehs-title">EHS Shiksha Foundation</h1>
      <h2 className="ehs-subtitle">Environment, Health & Safety NGO</h2>

      <section className="ehs-section">
        <h3 className="section-title"> Training On First Aid & Emergency Medicine</h3>
        
        <div className="ehs-content">
          <h4 className="ehs-heading">Importance of First Aid</h4>
          <p>
            At any moment, you or someone around you could experience an injury or illness. Basic first aid can prevent minor mishaps from worsening and, in serious emergencies, may even save a life. Learning these essential skills ensures that you can provide vital support until professional help arrives.
          </p>
          
          <h4 className="ehs-heading">Definition of First Aid</h4>
          <p>First aid involves providing immediate care to someone experiencing a sudden injury or illness.</p>
        </div>
      </section>

      <section className="ehs-section">
        <h4 className="section-title">Contents</h4>
        <ul className="content-list">
          <li>Pre-Evaluation Test</li>
          <li>Introduction to First Aid</li>
          <li>Unconsciousness & Handling Casualties</li>
          <li>Injuries from Falls</li>
          <li>Burns, Fractures, Snake Bites</li>
          <li>Drowning, Heart Attack & CPR</li>
          <li>Types of Bandaging, Stretcher Drill</li>
          <li>DRABC: Danger, Response, Airway, Breathing & Circulation</li>
          <li>Post-Evaluation Test</li>
        </ul>
      </section>

      <section className="ehs-section">
        <h4 className="section-title">Outlook</h4>
        <p>
          While providing first aid, protect yourself from contagious illnesses and other hazards. Always check for potential risks, use protective equipment, and wash your hands immediately after care.
        </p>
      </section>

      <section className="ehs-section">
        <h4 className="section-title">First Aid Kit List</h4>
        <p>A well-stocked first aid kit should be available in your home, car, and workplace. Essential items include:</p>
        <ul className="content-list">
          <li>Assorted Bandages, Gauze, and Dressings</li>
          <li>Adhesive Tape, Antiseptic Wipes, Aspirin</li>
          <li>Ibuprofen, Antibiotic Ointment, Hydrocortisone Cream</li>
          <li>Calamine Lotion, Gloves, Safety Pins, Scissors</li>
          <li>Instant Cold Pack, Blanket, First Aid Manual</li>
        </ul>
        <p>Include emergency contacts and healthcare provider information in each kit.</p>
      </section>

      <section className="ehs-section">
        <h4 className="section-title">DRABC & Cardio Pulmonary Resuscitation (CPR)</h4>
        <ul className="content-list">
          <li><strong>Danger:</strong> Check for risks to you, others, and casualties</li>
          <li><strong>Response:</strong> Speak, shake, or pinch earlobe to check consciousness</li>
          <li><strong>Airway:</strong> Check for blockages; tilt head back if necessary</li>
          <li><strong>Breathing:</strong> Ensure the casualty is breathing</li>
          <li><strong>Circulation:</strong> Check for pulse; perform CPR if no pulse (30:2 compressions to breaths)</li>
        </ul>
      </section>
    </div>
  );
}

export default EHSShiksha;
