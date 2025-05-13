import React from "react";
import stackerImage from '../products/stacker.png'

function Stacker() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Stacker</h1>
      </header>

      <div style={styles.imageContainer}>
        <div style={{ ...styles.imagePlaceholder, backgroundImage: `url(${stackerImage})` }}></div>
      </div>

      <section style={styles.description}>
        <h2 style={styles.sectionTitle}>Overview</h2>
        <p style={styles.descriptionText}>
          Stackers are specialized material handling equipment designed to lift and stack pallets efficiently. They are widely used in warehouses, retail, and manufacturing environments where space optimization is crucial...
        </p>
      </section>

      <section style={styles.instructions}>
        <h2 style={styles.sectionTitle}>Instructions for Use</h2>
        <ol style={styles.instructionList}>
          <li>Check the stacker for any defects before use.</li>
          <li>Align the forks with the pallet and insert them carefully.</li>
          <li>Use the hydraulic lift to elevate the load to the desired height.</li>
          <li>Transport the load safely and lower it gently to the ground.</li>
        </ol>
      </section>

      <section style={styles.precautions}>
        <h2 style={styles.sectionTitle}>Safety Precautions</h2>
        <ul style={styles.precautionList}>
          <li>Always wear safety gear when operating the stacker.</li>
          <li>Do not overload the stacker beyond its rated capacity.</li>
          <li>Ensure the area is clear of obstacles when moving loads.</li>
          <li>Keep the stacker in good condition and perform regular maintenance.</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <h3 style={styles.footerTitle}>Conclusion</h3>
        <p style={styles.footerText}>
          Stackers are essential tools for effective warehouse operations. By following safety protocols and operational guidelines, users can maximize the efficiency of stacking tasks...
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

export default Stacker;
