import React from "react";

function CagePlatform() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Man Lift Safety Cage Platform</h1>
        <p style={styles.description}>
          The Man Lift Safety Cage Platform is designed for working at height, ensuring safety for maintenance and repair tasks. Built with a secure attachment to the forklift and a slip-resistant floor, it provides a safe, easy-to-use solution for elevated work.
        </p>
      </header>

      <section style={styles.specsSection}>
        <h2 style={styles.sectionTitle}>Specifications</h2>
        <div style={styles.specsList}>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Load Capacity:</span> 250 kg
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Net Weight:</span> 112 kg
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Platform Size:</span> 1000 x 1200 mm
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Features</h2>
        <ul style={styles.featureList}>
          <li>Swing out guiderail with safety pin, slip-resistant floor with drainage hole, and crash barrier for enhanced safety.</li>
          <li>Fixed to the forklift using a safety pin and chains for stability.</li>
          <li>Easy to dismantle and install, requiring minimal storage space.</li>
          <li>Optional swivel casters for convenient movement.</li>
          <li>Ideal for working at height and maintenance repair tasks.</li>
        </ul>
      </section>

      <section style={styles.imageSection}>
        <h2 style={styles.sectionTitle}>Product Images</h2>
        <div style={styles.imageContainer}>
          <div style={styles.imageBox}>Image 1</div>
          <div style={styles.imageBox}>Image 2</div>
          <div style={styles.imageBox}>Image 3</div>
          <div style={styles.imageBox}>Image 4</div>
        </div>
      </section>
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
    backgroundImage: "linear-gradient(to right, #1a1a1a, #2c2c2c)",
    transition: "all 0.3s ease",
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
  description: {
    fontSize: "16px",
    color: "#cccccc",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  sectionTitle: {
    fontSize: "22px",
    color: "#ff4b5c",
    textAlign: "center",
    marginBottom: "16px",
    borderBottom: "2px solid #ff4b5c",
    paddingBottom: "8px",
  },
  specsSection: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  specsList: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    fontSize: "16px",
    color: "#cccccc",
  },
  specItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specLabel: {
    fontWeight: "bold",
    color: "#ff4b5c",
  },
  featuresSection: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  featureList: {
    listStyleType: "disc",
    paddingLeft: "20px",
    lineHeight: "1.6",
    color: "#cccccc",
  },
  imageSection: {
    textAlign: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  imageBox: {
    backgroundColor: "#3a3a3a",
    width: "calc(25% - 10px)",
    height: "100px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
};

export default CagePlatform;
