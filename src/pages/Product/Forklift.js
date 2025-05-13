import React, { useState, useEffect } from "react";
import { useCart } from '../CartContext'; // Import the cart context
import forkliftImage from "./eforklift.png"; // The product image
import { Link } from 'react-router-dom'; // Import the Link component

function Forklift() {
  const { addToCart } = useCart(); // Get addToCart function from CartContext
  const [notification, setNotification] = useState(null); // State to manage notification visibility

  const product = {
    id: 'forklift001',
    name: 'Forklift',
    price: 5500,
    imageUrl: forkliftImage,
    description: 'A powerful industrial truck used to lift and move materials over short distances.',
  };

  const handleAddToCart = () => {
    addToCart(product); // Add the forklift to the cart
    setNotification(`${product.name} added to cart!`); // Set the notification message
  };

  // Auto-hide the notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // Hide notification after 3 seconds
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [notification]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Forklift</h1>
      </header>

      <div style={styles.imageContainer}>
        <div style={styles.imagePlaceholder}>
          <div style={styles.productInfo}>
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.productPrice}>${product.price}</p>
          </div>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Link to="/checkout">
          <Button>Buy now</Button>
        </Link>
      </div>

      <section style={styles.description}>
        <h2 style={styles.sectionTitle}>Overview</h2>
        <p style={styles.descriptionText}>
          {product.description}
        </p>
      </section>

      <footer style={styles.footer}>
        <h3 style={styles.footerTitle}>Conclusion</h3>
        <p style={styles.footerText}>
          Forklifts are essential for material handling and industrial tasks...
        </p>
      </footer>

      {/* Enhanced Notification */}
      {notification && (
        <div style={styles.notification}>
          <p>{notification}</p>
          <button style={styles.closeButton} onClick={() => setNotification(null)}>
            &times;
          </button>
        </div>
      )}
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
    backgroundImage: `url(${forkliftImage})`,
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
  description: {
    marginTop: "20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#ff4b5c",
    marginBottom: "10px",
  },
  descriptionText: {
    fontSize: "16px",
    color: "#ccc",
    lineHeight: "1.5",
  },
  footer: {
    backgroundColor: "#1a1a1a",
    padding: "15px",
    textAlign: "center",
    borderTop: "1px solid #333",
    borderBottom: "none",
  },
  footerTitle: {
    fontSize: "18px",
    color: "#ff4b5c",
    fontWeight: "500",
    marginBottom: "10px",
  },
  footerText: {
    fontSize: "14px",
    color: "#ccc",
    lineHeight: "1.5",
  },

  // Enhanced Notification Styles
  notification: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#ff4b5c",
    color: "#fff",
    padding: "15px 25px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    fontSize: "16px",
    fontWeight: "600",
    zIndex: 1000,
    opacity: 0,
    animation: "fadeIn 0.5s forwards, fadeOut 0.5s 2.5s forwards",
  },
  closeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },
};

// CSS Keyframes for animation
const animationStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${animationStyles}</style>`);

// Button component with hover effects
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

export default Forklift;
