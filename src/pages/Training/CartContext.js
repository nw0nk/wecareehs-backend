// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component that will wrap your app and provide the context
export const CartProvider = ({ children }) => {
  // Load cart items from localStorage, or default to an empty array if no cart data is found
  const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems)); // Save to localStorage
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
