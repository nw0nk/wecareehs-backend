import React from 'react';
import { useCart } from './CartContext'; // Import the useCart hook
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Access cart items and functions from context

  const handleRemoveItem = (id) => {
    removeFromCart(id); // Remove the item from the cart by id
  };

  const handleQuantityChange = (id, amount) => {
    updateQuantity(id, amount); // Update the quantity of the item
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.cartPage}>
      <h1 style={styles.heading}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.emptyCartMessage}>Your cart is empty.</p>
      ) : (
        <div style={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <div style={styles.quantityControls}>
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)} 
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={styles.total}>
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
        </div>
      )}

      <div style={styles.checkoutContainer}>
        <Link 
          to="/checkout"
          state={{ cartItems }} // Pass cart items as state to the CheckoutPage
        >
          <button style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  cartPage: {
    padding: '20px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  emptyCartMessage: {
    textAlign: 'center',
    fontSize: '18px',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '8px',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemDetails: {
    flex: 1,
  },
  quantityControls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#ff4b5c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  checkoutContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  checkoutButton: {
    backgroundColor: '#ff4b5c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '18px',
  },
};

export default CartPage;
