import React from "react";

function FVCamera() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Fork (Front) Camera System</h1>
        <p style={styles.description}>
          The Fork Camera System is designed specifically for forklifts, mounted inside the fork to provide an optimal eye-level view of pallets. Its durable construction and advanced design help protect the camera from damage while delivering high-quality images.
        </p>
      </header>

      <section style={styles.specsSection}>
        <h2 style={styles.sectionTitle}>Specifications</h2>
        <div style={styles.specsList}>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Lens Type:</span> Pin-hole lens (3 mm)
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Sensor:</span> CMOS sensor
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Water Resistance:</span> IP69K
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Features</h2>
        <ul style={styles.featureList}>
          <li>Stainless steel casing for enhanced durability.</li>
          <li>Mounted on the inside of the fork for optimal positioning.</li>
          <li>Pinhole lens with 3 mm opening to prevent damage.</li>
          <li>Delivers optimal images even in low-light conditions.</li>
          <li>Resistant to pressure washers (IP69K rating).</li>
          <li>Parallel view of both forks, highly resistant to impact.</li>
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

export default FVCamera;
