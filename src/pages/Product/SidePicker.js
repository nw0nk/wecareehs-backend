import React from "react";
import sidePickerImage from '../products/sidepicker.png';

function SidePicker() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Side Picker</h1>
      </header>

      <div style={styles.imageContainer}>
        <div style={{ ...styles.imagePlaceholder, backgroundImage: `url(${sidePickerImage})` }}></div>
      </div>

      <section style={styles.description}>
        <h2 style={styles.sectionTitle}>Overview</h2>
        <p style={styles.descriptionText}>
          Side pickers are specialized forklifts designed to handle and pick up materials from the side. They are particularly useful in narrow aisles and crowded environments...
        </p>
      </section>

      <section style={styles.instructions}>
        <h2 style={styles.sectionTitle}>Instructions for Use</h2>
        <ol style={styles.instructionList}>
          <li>Inspect the side picker before each use.</li>
          <li>Position the forks beside the load and engage carefully.</li>
          <li>Lift the load and ensure it's balanced before moving.</li>
          <li>Place the load gently at the designated location.</li>
        </ol>
      </section>

      <section style={styles.precautions}>
        <h2 style={styles.sectionTitle}>Safety Precautions</h2>
        <ul style={styles.precautionList}>
          <li>Do not exceed the side picker's load capacity.</li>
          <li>Ensure all personnel are clear of the work area.</li>
          <li>Maintain visibility and communicate with nearby workers.</li>
          <li>Regularly check for mechanical issues or wear.</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <h3 style={styles.footerTitle}>Conclusion</h3>
        <p style={styles.footerText}>
          Side pickers enhance the efficiency of material handling in tight spaces. Understanding their operation and adhering to safety measures is crucial for effective use...
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#1a1a1a",
    color: "white",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "20px auto",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 1s ease-in-out",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    color: "#ff4b5c",
    fontSize: "28px",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  imagePlaceholder: {
    width: "300px",
    height: "400px",
    backgroundColor: "#ffffff",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.4s ease-in-out",
  },
  description: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  sectionTitle: {
    fontSize: "22px",
    color: "#ff4b5c",
    textAlign: "center",
    marginBottom: "16px",
    borderBottom: "2px solid #ff4b5c",
    paddingBottom: "8px",
  },
  descriptionText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#cccccc",
    marginBottom: "12px",
  },
  instructionList: {
    listStyleType: "decimal",
    paddingLeft: "20px",
    color: "#cccccc",
    fontSize: "16px",
  },
  precautionList: {
    listStyleType: "disc",
    paddingLeft: "20px",
    color: "#cccccc",
    fontSize: "16px",
  },
  footer: {
    textAlign: "center",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#2c2c2c",
    borderRadius: "8px",
  },
  footerTitle: {
    fontSize: "22px",
    color: "#ff4b5c",
  },
  footerText: {
    fontSize: "16px",
    color: "#cccccc",
  },
};

export default SidePicker;
