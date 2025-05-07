import React from "react";

function ArcLight() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Forklift Arc Light</h1>
        <p style={styles.description}>
          Our LED Arc Light is designed for the rear of the forklift, with a round, smooth-edged design that aligns with the forklift’s counterweight. It provides a clear directional indicator to pedestrians, making it easier to identify the truck’s orientation and the operator’s position. Available in green, amber, red, and blue.
        </p>
      </header>

      <section style={styles.specsSection}>
        <h2 style={styles.sectionTitle}>Specifications</h2>
        <ul style={styles.specList}>
          <li>LED Power: 6W</li>
          <li>Voltage Range: 10-80V DC</li>
          <li>Lumen: 1500LM</li>
          <li>Beam: Arc/U beam</li>
          <li>Size: 80 x 59 x 130 mm</li>
          <li>Waterproof Rate: IP67</li>
          <li>LED Lifetime: 50,000 hours</li>
          <li>Die-Cast Aluminum Housing</li>
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
    textAlign:"justify"
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
  specList: {
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

export default ArcLight;
