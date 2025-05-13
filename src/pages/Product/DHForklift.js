import React from "react";
import dhForkliftImage from '../products/dhforklift.png';

function DHForklift() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>DHForklift</h1>
      </header>

      <div style={styles.imageContainer}>
        <div style={{ ...styles.imagePlaceholder, backgroundImage: `url(${dhForkliftImage})` }}></div>
      </div>

      <section style={styles.description}>
        <h2 style={styles.sectionTitle}>Overview</h2>
        <p style={styles.descriptionText}>
          The DH forklift is designed for heavy-duty lifting and material handling. Its robust structure allows it to operate in demanding environments...
        </p>
      </section>

      <section style={styles.instructions}>
        <h2 style={styles.sectionTitle}>Instructions for Use</h2>
        <ol style={styles.instructionList}>
          <li>Inspect the forklift for mechanical issues before operation.</li>
          <li>Use the proper lifting techniques to handle materials.</li>
          <li>Follow all safety protocols while operating the forklift.</li>
          <li>Keep the work area clear of hazards while operating.</li>
        </ol>
      </section>

      <section style={styles.precautions}>
        <h2 style={styles.sectionTitle}>Safety Precautions</h2>
        <ul style={styles.precautionList}>
          <li>Wear appropriate safety gear when operating.</li>
          <li>Be aware of your surroundings to avoid accidents.</li>
          <li>Regularly maintain and inspect the forklift for safety.</li>
          <li>Do not operate the forklift under the influence of drugs or alcohol.</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <h3 style={styles.footerTitle}>Conclusion</h3>
        <p style={styles.footerText}>
          The DH forklift is essential for efficient material handling. Understanding its operation and adhering to safety standards is vital for user safety and productivity...
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

export default DHForklift;
