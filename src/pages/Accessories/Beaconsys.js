import React from "react";

function Beaconsys() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Beacon Light</h1>
      </header>

      <section style={styles.range}>
        <h2 style={styles.sectionTitle}>Range of Beacons</h2>
        <ul style={styles.beaconList}>
          <li>LED Beacons</li>
          <li>Rotating Beacons</li>
          <li>Strobe Beacons</li>
          <li>Xenon Beacons</li>
          <li>Static Flash Beacons</li>
        </ul>
      </section>

      <section style={styles.description}>
        <h2 style={styles.sectionTitle}>Description</h2>
        <p style={styles.descriptionText}>
          We offer a complete range of beacons in Rotating, Strobe, and LED technology with a wide range of colors and all the popular fitting options. Beacons are useful for all applications, including a comprehensive range of on and off models, medium and heavy-duty, agriculture, and for emergency vehicles like ambulances, fire tenders, industrial vehicles, and lift trucks. We supply stock beacons for airport applications that meet ICAO regulations.
        </p>
      </section>

      <section style={styles.options}>
        <h2 style={styles.sectionTitle}>Options</h2>
        <p style={styles.optionsText}>
          Low and high profile and multicolor options, multi-voltage versions in halogen, strobe, and LED can be synchronized with other LED products. Available as SAE approved and ECE R65 approved pole, 3 bolt, and magnetic fixings.
        </p>
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
  sectionTitle: {
    fontSize: "22px",
    color: "#ff4b5c",
    textAlign: "center",
    marginBottom: "16px",
    borderBottom: "2px solid #ff4b5c",
    paddingBottom: "8px",
  },
  range: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  beaconList: {
    listStyleType: "circle",
    paddingLeft: "20px",
    color: "#cccccc",
    fontSize: "16px",
  },
  description: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  descriptionText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#cccccc",
    marginBottom: "12px",
  },
  options: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  optionsText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#cccccc",
    marginBottom: "12px",
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

export default Beaconsys;
