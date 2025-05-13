import React from "react";

function BRLight() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Blue Spot & Red Zone Light</h1>
        <p style={styles.description}>
          Our Blue Spot and Red Zone Lights enhance safety in aisles and at crossings with poor visibility. They project a clear spot on the ground well ahead of the forklift, allowing pedestrians ample time to move out of the way. Designed for both forward and backward driving, these lights provide high-intensity illumination while using minimal energy.
        </p>
      </header>

      <section style={styles.specsSection}>
        <h2 style={styles.sectionTitle}>Features</h2>
        <ul style={styles.featureList}>
          <li>Increases safety in aisles and at crossings with poor visibility.</li>
          <li>Projects a spot on the ground to alert pedestrians well in advance.</li>
          <li>Usable when driving both forward and backward.</li>
          <li>Anti-glare, high-intensity light using low energy levels.</li>
          <li>Very low operating temperature for prolonged use.</li>
          <li>Resistant to shaking, vibrations, and high-pressure cleaning.</li>
          <li>No need for disruptive acoustic warning signals.</li>
          <li>Creates a closed halo keep-out zone with three or four red lines.</li>
          <li>Housing made of 100% die-cast aluminum for durability.</li>
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

export default BRLight;
