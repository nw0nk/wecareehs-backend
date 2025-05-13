import React from "react";

function ForkExtension() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Fork Extension</h1>
        <p style={styles.description}>
          Extensions are the ideal solution for occasionally transporting loads longer than the available industrial truck's forks. Install quickly by sliding them over the existing forks and secure them with an optional locking pin.
        </p>
      </header>

      <section style={styles.specsSection}>
        <h2 style={styles.sectionTitle}>Specifications</h2>
        <div style={styles.specsList}>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Make:</span> LIFTEC
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Length:</span> 1800 mm STD
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Width:</span> 162 mm
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Height:</span> 52.2 mm
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>Application:</span> Suitable for any forklift for fork extension.
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Features</h2>
        <ul style={styles.featureList}>
          <li>Solid welded design with open bottom.</li>
          <li>Tip tapered - chamfered and removable locking pin (optional).</li>
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
    textAlign:"justify",
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

export default ForkExtension;
