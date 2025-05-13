import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import HPTruck from './HPTruck';
import CartPage from './CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/product/hptruck" element={<HPTruck />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
