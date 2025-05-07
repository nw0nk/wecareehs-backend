import React, { useState, useEffect } from "react";
import { useCart } from '../CartContext'; // Import the cart context
import boptImage from './bopt.png'; 

function BOPT() { 
    const { addToCart } = useCart(); // Get addToCart function from CartContext
    const [notification, setNotification] = useState(null); // State to manage notification visibility

    const product = {
        id: 'bopt001',
        name: 'Battery Operated Pallet Truck',
        price: 2500,
        imageUrl: boptImage,
        description: 'A battery-operated pallet truck for smooth handling of goods.',
    };

    const handleAddToCart = () => {
        addToCart(product); // Add the product to the cart
        setNotification(`${product.name} added to cart!`); // Set the notification message
    };

    const handleBuyNow = () => {
        addToCart(product); // Add to cart first
        // Logic for navigating to checkout or opening checkout page
        window.location.href = "/checkout"; // Example redirect to checkout page
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
                <h1 style={styles.title}>Battery Operated Pallet Truck (BOPT)</h1> 
            </header> 
            <div style={styles.imageContainer}> 
                <div style={styles.imagePlaceholder}>
                    <div style={styles.productInfo}>
                        <h2 style={styles.productName}>Battery Operated Pallet Truck</h2>
                        <p style={styles.productPrice}>Price: ${product.price}</p>
                    </div>
                </div>
            </div> 

            <div style={styles.buttonContainer}>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
                <Button onClick={handleBuyNow}>Buy Now</Button>
            </div>

            <section style={styles.description}> 
                <h2 style={styles.sectionTitle}>Overview</h2> 
                <p style={styles.descriptionText}>
                    The Battery Operated Pallet Truck (BOPT) is an essential asset in modern warehouses and logistics operations. Designed for efficiency and ease of use, it empowers operators to transport heavy loads with minimal effort. Ideal for large facilities, the BOPT combines advanced technology with ergonomic design, maximizing productivity and reducing strain.
                </p>
                <p style={styles.descriptionText}>
                    Featuring power-assisted controls and rechargeable battery systems, BOPTs are well-suited for fast-paced environments where efficiency and safety are paramount. The truck’s electric drive provides smooth and quiet operation, enabling operators to navigate tight spaces and heavy traffic areas with ease.
                </p>
            </section>

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
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", 
        transition: "transform 0.3s ease",
        animation: "fadeIn 0.8s ease-in-out", 
    }, 
    
    header: { textAlign: "center", marginBottom: "20px" }, 
    
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
        position: 'relative',
    }, 
    
    imagePlaceholder: { 
        width: "300px", 
        height: "300px", 
        backgroundImage: `url(${boptImage})`, 
        backgroundColor:"white",
        backgroundSize: "contain", 
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.4s ease",
        marginTop: "-20px", 
    },
    
    productInfo: { 
        position: 'absolute', 
        bottom: '0', 
        width: '100%', 
        textAlign: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        padding: '10px',
        borderRadius: '0 0 8px 8px',
    },
    
    productName: { fontSize: '18px', fontWeight: 'bold', color: '#fff' }, 
    productPrice: { fontSize: '16px', color: '#ff4b5c' }, 
    
    buttonContainer: { display: 'flex', justifyContent: 'center', marginTop: '10px' },
    
    button: { 
        padding: '10px 20px', 
        margin: '5px', 
        borderRadius: '5px', 
        border: 'none', 
        backgroundColor: '#ff4b5c', 
        color: '#fff', 
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    
    description: { 
        backgroundColor: "#2c2c2c", 
        padding: "20px", 
        borderRadius: "8px", 
        marginTop: "20px",
        transition: "all 0.3s ease",
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

export default BOPT;
