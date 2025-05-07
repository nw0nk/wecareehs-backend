import React from "react";

function BAsys() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Biometric Access Control System</h1>
        <p style={styles.description}>
          The need for a biometric access control system on forklifts is essential to control the unauthorized driving of forklifts, stackers, battery-operated pallet trucks, aerial work platforms, and more. Unauthorized operation can lead to serious accidents and restrict the abuse of Material Handling Equipment (MHE). This system effectively prevents unauthorized driving and operation by untrained, unauthorized, and non-employee personnel.
        </p>
      </header>

      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How it Works?</h2>
        <p style={styles.howItWorksText}>
          This system utilizes INTERLESS CLUSTER SCANNED FINGER IMAGE PROCESSING, allowing only authorized personnel, whose finger image is stored in the biometric machine system, to operate the equipment. 
        </p>
        <p style={styles.howItWorksText}>
          For operating the equipment, the operator must first sit in the seat. Once the operator buckles up the seat belt, the seat belt sensor sends a signal to the biometric system. The authorized operator then presses their finger on the biometric system, which allows the system to operate using a key or push button.
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
  description: {
    fontSize: "16px",
    color: "#cccccc",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
    textAlign:"justify",
  },
  howItWorks: {
    backgroundColor: "#2c2c2c",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  howItWorksText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#cccccc",
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

export default BAsys;
