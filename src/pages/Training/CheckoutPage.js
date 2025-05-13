import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css'; // Importing external CSS for styling
import { 
  FaCreditCard, 
  FaPaypal, 
  FaMoneyBillAlt, 
  FaLock, 
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaGlobe,
  FaInfoCircle,
  FaShieldAlt
} from 'react-icons/fa';
import { useCart } from './CartContext';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phoneNumber: '',
    
    // Shipping Information
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Billing Information
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: '',
    
    // Payment Details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    
    // Additional Information
    specialInstructions: '',
    saveAddress: false,
    sameAsShipping: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  useEffect(() => {
    if (!orderComplete && (!cartItems || cartItems.length === 0)) {
      navigate('/cart');
    }
  }, [cartItems, navigate, orderComplete]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // If sameAsShipping is checked, update billing address
    if (name === 'sameAsShipping' && checked) {
      setFormData(prev => ({
        ...prev,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingState: prev.state,
        billingPostalCode: prev.postalCode,
        billingCountry: prev.country
      }));
    }
  };

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
    if (error) setError('');
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateForm = () => {
    const errors = {};
    
    // Personal Information Validation
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    else if (!validatePhone(formData.phoneNumber)) errors.phoneNumber = 'Invalid phone number';
    
    // Shipping Information Validation
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) errors.country = 'Country is required';
    
    // Billing Information Validation (if not same as shipping)
    if (!formData.sameAsShipping) {
      if (!formData.billingAddress.trim()) errors.billingAddress = 'Billing address is required';
      if (!formData.billingCity.trim()) errors.billingCity = 'Billing city is required';
      if (!formData.billingState.trim()) errors.billingState = 'Billing state is required';
      if (!formData.billingPostalCode.trim()) errors.billingPostalCode = 'Billing postal code is required';
      if (!formData.billingCountry.trim()) errors.billingCountry = 'Billing country is required';
    }
    
    // Payment Method Validation
    if (!selectedPayment) {
      errors.paymentMethod = 'Please select a payment method';
    } else {
      if (selectedPayment === 'Card') {
        if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
          errors.cardNumber = 'Please enter a valid 16-digit card number';
        }
        if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
          errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        }
        if (!formData.cvv.match(/^\d{3}$/)) {
          errors.cvv = 'Please enter a valid 3-digit CVV';
        }
        if (!formData.cardholderName.trim()) {
          errors.cardholderName = 'Cardholder name is required';
        }
      } else if (selectedPayment === 'UPI' && !formData.upiId.trim()) {
        errors.upiId = 'UPI ID is required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOrderComplete(true);
    } catch (err) {
      setError('An error occurred while processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const total = cartItems?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0;

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <div className="order-complete">
          <FaCheckCircle className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <button className="confirm-button" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {/* Progress Steps */}
      <div className="checkout-progress">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step} 
            className={`progress-step ${currentStep >= step ? 'active' : ''}`}
          >
            <div className="step-number">{step}</div>
            <div className="step-label">
              {step === 1 ? 'Cart Review' : 
               step === 2 ? 'Shipping' : 
               step === 3 ? 'Payment' : 'Confirmation'}
            </div>
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
      {/* Order Summary Section */}
      <section className="order-summary">
        <h2 className="section-title">Order Summary</h2>
        <div className="order-items">
          {cartItems?.map((item) => (
              <div className="order-item" key={item.id || Math.random()}>
              <img src={item.imageUrl} alt={item.name} className="order-item-image" />
              <div className="order-item-details">
                <p className="item-name">{item.name}</p>
                  <p className="item-quantity">Quantity: {item.quantity || 1}</p>
                  <p className="item-price">Price: ${item.price?.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </section>

        {/* Personal Information Section */}
        <section className="personal-info">
          <h2 className="section-title">Personal Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">
                <FaUser className="input-icon" /> Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`input-field ${formErrors.fullName ? 'error' : ''}`}
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`input-field ${formErrors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                <FaPhone className="input-icon" /> Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className={`input-field ${formErrors.phoneNumber ? 'error' : ''}`}
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              {formErrors.phoneNumber && <span className="error-text">{formErrors.phoneNumber}</span>}
            </div>
        </div>
      </section>

      {/* Shipping Information Section */}
      <section className="shipping-info">
        <h2 className="section-title">Shipping Information</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="address">
                <FaMapMarkerAlt className="input-icon" /> Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={`input-field ${formErrors.address ? 'error' : ''}`}
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {formErrors.address && <span className="error-text">{formErrors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="apartment">Apartment, suite, etc.</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                className="input-field"
                value={formData.apartment}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">
                <FaBuilding className="input-icon" /> City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`input-field ${formErrors.city ? 'error' : ''}`}
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              {formErrors.city && <span className="error-text">{formErrors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State/Province</label>
              <input
                type="text"
                id="state"
                name="state"
                className={`input-field ${formErrors.state ? 'error' : ''}`}
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              {formErrors.state && <span className="error-text">{formErrors.state}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className={`input-field ${formErrors.postalCode ? 'error' : ''}`}
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
              {formErrors.postalCode && <span className="error-text">{formErrors.postalCode}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="country">
                <FaGlobe className="input-icon" /> Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className={`input-field ${formErrors.country ? 'error' : ''}`}
                value={formData.country}
                onChange={handleInputChange}
                required
              />
              {formErrors.country && <span className="error-text">{formErrors.country}</span>}
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="saveAddress"
              name="saveAddress"
              checked={formData.saveAddress}
              onChange={handleInputChange}
            />
            <label htmlFor="saveAddress">Save this address for future orders</label>
          </div>
        </section>

        {/* Billing Information Section */}
        <section className="billing-info">
          <h2 className="section-title">Billing Information</h2>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="sameAsShipping"
              name="sameAsShipping"
              checked={formData.sameAsShipping}
              onChange={handleInputChange}
            />
            <label htmlFor="sameAsShipping">Same as shipping address</label>
          </div>

          {!formData.sameAsShipping && (
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="billingAddress">Billing Address</label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  className={`input-field ${formErrors.billingAddress ? 'error' : ''}`}
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.billingAddress && <span className="error-text">{formErrors.billingAddress}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="billingCity">City</label>
                <input
                  type="text"
                  id="billingCity"
                  name="billingCity"
                  className={`input-field ${formErrors.billingCity ? 'error' : ''}`}
                  value={formData.billingCity}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.billingCity && <span className="error-text">{formErrors.billingCity}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="billingState">State/Province</label>
                <input
                  type="text"
                  id="billingState"
                  name="billingState"
                  className={`input-field ${formErrors.billingState ? 'error' : ''}`}
                  value={formData.billingState}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.billingState && <span className="error-text">{formErrors.billingState}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="billingPostalCode">Postal Code</label>
                <input
                  type="text"
                  id="billingPostalCode"
                  name="billingPostalCode"
                  className={`input-field ${formErrors.billingPostalCode ? 'error' : ''}`}
                  value={formData.billingPostalCode}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.billingPostalCode && <span className="error-text">{formErrors.billingPostalCode}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="billingCountry">Country</label>
                <input
                  type="text"
                  id="billingCountry"
                  name="billingCountry"
                  className={`input-field ${formErrors.billingCountry ? 'error' : ''}`}
                  value={formData.billingCountry}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.billingCountry && <span className="error-text">{formErrors.billingCountry}</span>}
              </div>
            </div>
          )}
      </section>

      {/* Payment Options Section */}
      <section className="payment-options">
        <h2 className="section-title">Payment Method</h2>
        <div className="payment-methods">
          <div
            className={`payment-option ${selectedPayment === 'UPI' ? 'selected' : ''}`}
            onClick={() => handlePaymentSelection('UPI')}
          >
            <FaMoneyBillAlt className="payment-icon" />
            <p>UPI Payment</p>
          </div>

          <div
            className={`payment-option ${selectedPayment === 'PayPal' ? 'selected' : ''}`}
            onClick={() => handlePaymentSelection('PayPal')}
          >
            <FaPaypal className="payment-icon" />
            <p>PayPal</p>
          </div>

          <div
            className={`payment-option ${selectedPayment === 'Card' ? 'selected' : ''}`}
            onClick={() => handlePaymentSelection('Card')}
          >
            <FaCreditCard className="payment-icon" />
            <p>Credit/Debit Card</p>
          </div>
        </div>

        {selectedPayment && (
          <div className="payment-details">
            {selectedPayment === 'UPI' && (
                <div>
                  <input
                    type="text"
                    name="upiId"
                    placeholder="Enter UPI ID"
                    className={`input-field ${formErrors.upiId ? 'error' : ''}`}
                    value={formData.upiId}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.upiId && <span className="error-text">{formErrors.upiId}</span>}
                  <p className="payment-note">Enter your UPI ID to proceed with the payment</p>
                </div>
            )}
            {selectedPayment === 'PayPal' && (
                <div className="paypal-redirect">
                  <p>You will be redirected to PayPal for secure payment</p>
                  <FaLock className="lock-icon" />
                </div>
            )}
            {selectedPayment === 'Card' && (
                <div className="card-details">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    className={`input-field ${formErrors.cardNumber ? 'error' : ''}`}
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      cardNumber: formatCardNumber(e.target.value)
                    }))}
                    maxLength="19"
                    required
                  />
                  {formErrors.cardNumber && <span className="error-text">{formErrors.cardNumber}</span>}
                  
                  <div className="card-row">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className={`input-field ${formErrors.expiryDate ? 'error' : ''}`}
                      value={formData.expiryDate}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        expiryDate: formatExpiryDate(e.target.value)
                      }))}
                      maxLength="5"
                      required
                    />
                    {formErrors.expiryDate && <span className="error-text">{formErrors.expiryDate}</span>}
                    
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      className={`input-field ${formErrors.cvv ? 'error' : ''}`}
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength="3"
                      required
                    />
                    {formErrors.cvv && <span className="error-text">{formErrors.cvv}</span>}
                  </div>
                  
                  <input
                    type="text"
                    name="cardholderName"
                    placeholder="Cardholder Name"
                    className={`input-field ${formErrors.cardholderName ? 'error' : ''}`}
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.cardholderName && <span className="error-text">{formErrors.cardholderName}</span>}
              </div>
            )}
          </div>
        )}
      </section>

        {/* Special Instructions Section */}
        <section className="special-instructions">
          <h2 className="section-title">Additional Information</h2>
          <div className="form-group">
            <label htmlFor="specialInstructions">Special Instructions (Optional)</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              className="input-field"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              rows="4"
              placeholder="Add any special instructions for your order..."
            />
          </div>
        </section>

        {/* Security Notice */}
        <div className="security-notice">
          <FaShieldAlt className="security-icon" />
          <p>Your payment information is secure and encrypted</p>
        </div>

      <div className="confirm-order">
          <button 
            className="confirm-button" 
            type="submit"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
      </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
