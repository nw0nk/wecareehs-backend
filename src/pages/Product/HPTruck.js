// HPTruck.js
import React, { useState } from "react";
import { useCart } from '../CartContext'; // Import the useCart hook
import hptruck from './hptruck.png'; // The product image
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

function HPTruck() {
  const { addToCart } = useCart(); // Destructure addToCart from the context
  const [showNotification, setShowNotification] = useState(false); // State to show notification

  const product = {
    id: 'hptruck', // Unique id for this product
    name: 'Hand Pallet Truck',
    price: 299.99,
    imageUrl: hptruck, // Add the image URL here
  };

  const handleAddToCart = () => {
    addToCart(product); // Call addToCart with the product data
    setShowNotification(true); // Show notification
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Hand Pallet Truck</h1>
      </header>

      <div style={styles.imageContainer}>
        <div style={styles.imagePlaceholder}>
          <div style={styles.productInfo}>
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Link to="/checkout">
          <Button>Buy now</Button>
        </Link>
      </div>

      {showNotification && (
        <div style={styles.notification}>
          <p>{product.name} has been added to your cart!</p>
        </div>
      )}

      <section style={styles.description}>
        <h2 style={styles.sectionTitle}>Overview</h2>
        <p style={styles.descriptionText}>
          Hand pallet trucks, commonly referred to as pallet jacks or pump trucks, are essential equipment in warehouse and logistics environments...
        </p>
      </section>

      <footer style={styles.footer}>
        <h3 style={styles.footerTitle}>Conclusion</h3>
        <p style={styles.footerText}>
          Hand pallet trucks are indispensable tools in material handling...
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
    transition: "color 0.3s ease",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    backgroundSize: "contain",
  },
  imagePlaceholder: {
    width: "300px",
    height: "300px",
    backgroundImage: `url(${hptruck})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    position: "relative",
    overflow: "hidden",
    backgroundColor: '#fff',
  },
  productInfo: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#e0e0e0",
    padding: "10px",
    textAlign: "center",
    borderRadius: "0 0 8px 8px",
  },
  productName: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0",
  },
  productPrice: {
    fontSize: "16px",
    color: "#ff4b5c",
    margin: "5px 0 0 0",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#ff4b5c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  },
  notification: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#28a745", 
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    zIndex: "999",
    fontSize: "16px",
    animation: "slideIn 0.5s ease-out",
  },
  description: {
    padding: "20px",
    backgroundColor: "#2c2c2c",
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
    color: "#cccccc",
    lineHeight: "1.6",
    marginBottom: "12px",
  },
  footer: {
    marginTop: "30px",
    textAlign: "center",
  },
  footerTitle: {
    fontSize: "18px",
    color: "#ff4b5c",
  },
  footerText: {
    color: "#cccccc",
    fontSize: "14px",
  },
};

// Adding hover effect for buttons
const Button = ({ children, onClick }) => {
  return (
    <button
      style={styles.button} 
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.backgroundColor = "#e63946";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.backgroundColor = "#ff4b5c";
      }}
    >
      {children}
    </button>
  );
};

export default HPTruck;
