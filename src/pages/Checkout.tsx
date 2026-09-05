import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import type { CartItem } from '../types';

export const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get passed state from "Buy Now" or "Cart"
  const state = location.state as { cartItems?: CartItem[] } | null;
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!state || !state.cartItems || state.cartItems.length === 0) {
    return (
      <div className="bg-surface min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Checkout is Empty</h2>
          <p className="text-light text-sm mb-6">Select products from our collection to proceed with checkout.</p>
          <button className="btn btn-primary btn-full" onClick={() => navigate('/shop')}>
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  const { cartItems } = state;
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'SOUTH10' || cleanCode === 'FIRST10' || cleanCode === 'WELCOME10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setPromoMessage({ text: `Coupon applied! You saved ₹${disc.toLocaleString('en-IN')}`, type: 'success' });
    } else if (cleanCode === 'SOUTH20') {
      const disc = Math.round(subtotal * 0.2);
      setDiscount(disc);
      setPromoMessage({ text: `Special coupon applied! You saved ₹${disc.toLocaleString('en-IN')}`, type: 'success' });
    } else {
      setDiscount(0);
      setPromoMessage({ text: 'Invalid promo code. Try "SOUTH10" for 10% off!', type: 'error' });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    const orderId = `#SZ-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    navigate('/success', { 
      state: { 
        orderId, 
        cartItems, 
        total: finalTotal,
        paymentMethod,
        shippingDetails: formData
      } 
    });
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-surface min-h-screen pb-16 pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Navigation Breadcrumb & Checkout Steps */}
        <div className="mb-6">
          <div className="flex items-center text-xs text-light mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-black font-semibold">Checkout</span>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Checkout</h1>
            
            {/* Step Progress */}
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="flex items-center gap-1 text-success font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Cart
              </span>
              <span className="text-light">•</span>
              <span className="font-bold text-primary flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-primary">
                2. Shipping & Payment
              </span>
              <span className="text-light mobile-hide">•</span>
              <span className="text-light mobile-hide">3. Order Complete</span>
            </div>
          </div>
        </div>
        
        {/* Main 2-Column Layout */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Payment Methods (7 Cols) */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Section 1: Shipping Details */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">1</span>
                  Shipping Details
                </h2>
                <span className="text-xs text-light">* Required fields</span>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    className="input-field" 
                    placeholder="Enter your full name" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1">Mobile Number *</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-sm font-semibold text-light">+91</span>
                      <input 
                        required 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="input-field pl-12" 
                        placeholder="10-digit phone number"
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="input-field" 
                      placeholder="name@example.com" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1">Street Address / House No. *</label>
                  <input 
                    required 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    className="input-field" 
                    placeholder="House/Flat No., Building, Street Name, Area" 
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1">City *</label>
                    <input 
                      required 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                      className="input-field" 
                      placeholder="City" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1">State *</label>
                    <input 
                      required 
                      type="text" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleChange} 
                      className="input-field" 
                      placeholder="State" 
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1">Pincode *</label>
                    <input 
                      required 
                      type="text" 
                      name="pincode" 
                      value={formData.pincode} 
                      onChange={handleChange} 
                      className="input-field" 
                      placeholder="6-digit PIN" 
                      pattern="[0-9]{6}"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Payment Options */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <div className="border-b pb-4 mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-black text-white text-xs flex items-center justify-center font-bold">2</span>
                  Payment Method
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {/* Option: Cash on Delivery */}
                <label 
                  className={`flex items-start gap-4 p-4 rounded-md border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-primary bg-surface' : 'border-border hover:border-text-light'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')} 
                    className="mt-1 accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">Cash on Delivery (COD)</span>
                      <span className="text-xs bg-success text-white px-2 py-0.5 rounded font-medium">Popular</span>
                    </div>
                    <p className="text-xs text-light">Pay with cash when your package is delivered to your doorstep.</p>
                  </div>
                </label>

                {/* Option: Online UPI / Cards */}
                <label 
                  className={`flex items-start gap-4 p-4 rounded-md border-2 cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'border-primary bg-surface' : 'border-border hover:border-text-light'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="upi" 
                    checked={paymentMethod === 'upi'} 
                    onChange={() => setPaymentMethod('upi')} 
                    className="mt-1 accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">UPI / Credit Card / Debit Card / NetBanking</span>
                      <span className="text-xs bg-black text-white px-2 py-0.5 rounded">Fast & Secure</span>
                    </div>
                    <p className="text-xs text-light">Instant confirmation via GPay, PhonePe, Paytm, Cards & Banking.</p>
                  </div>
                </label>

                {/* Option: Cards */}
                <label 
                  className={`flex items-start gap-4 p-4 rounded-md border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-primary bg-surface' : 'border-border hover:border-text-light'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')} 
                    className="mt-1 accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">WhatsApp Order / Quick Pay</span>
                    </div>
                    <p className="text-xs text-light">Confirm order directly via WhatsApp support assistant.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button type="submit" className="btn btn-primary btn-full py-4 text-lg font-bold flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Place Order • ₹{finalTotal.toLocaleString('en-IN')}
              </button>
              <p className="text-xs text-center text-light mt-3">
                🔒 Safe & Encrypted Checkout. By clicking Place Order you agree to our policies.
              </p>
            </div>

          </div>

          {/* Right Column: Order Summary (5 Cols - Sticky) */}
          <div className="md:col-span-5">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="text-lg font-bold">Order Summary</h2>
                <span className="text-xs font-semibold bg-surface px-2.5 py-1 rounded-full text-light">
                  {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              
              {/* Product List */}
              <div className="flex flex-col gap-4 mb-6 max-h-72 overflow-y-auto pr-1 scrollbar-hide border-b pb-4">
                {cartItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 items-center">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.productName} 
                        className="w-16 h-20 object-cover rounded border border-border flex-shrink-0" 
                      />
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h4 className="font-bold text-sm line-clamp-1">{item.productName}</h4>
                        <div className="flex items-center gap-2 text-xs text-light mt-0.5">
                          {item.colorName && (
                            <span className="flex items-center gap-1">
                              <span>Color:</span>
                              <span className="font-medium text-black">{item.colorName}</span>
                            </span>
                          )}
                          {item.size && (
                            <span className="flex items-center gap-1">
                              <span>• Size:</span>
                              <span className="font-bold text-black bg-surface px-1.5 py-0.5 rounded">{item.size}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-xs text-light">Qty: {item.quantity}</span>
                        <span className="font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="mb-6 border-b pb-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-light mb-1.5">Have a Promo Code?</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode} 
                    onChange={(e) => setPromoCode(e.target.value)} 
                    placeholder="Enter code (e.g. SOUTH10)" 
                    className="input-field text-sm uppercase py-2"
                  />
                  <button 
                    type="button" 
                    onClick={handleApplyPromo}
                    className="btn btn-outline px-4 text-xs font-bold flex-shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-xs mt-2 font-medium ${promoMessage.type === 'success' ? 'text-success' : 'text-error'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-2.5 text-sm mb-4">
                <div className="flex justify-between text-light">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-light">
                  <span>Shipping & Delivery</span>
                  <span className="font-bold text-success uppercase text-xs bg-surface px-2 py-0.5 rounded">FREE</span>
                </div>

                <div className="flex justify-between text-light">
                  <span>Estimated Taxes</span>
                  <span className="text-xs font-medium">Included</span>
                </div>
              </div>

              {/* Total Payable */}
              <div className="border-t pt-4 flex justify-between items-center text-lg font-bold">
                <div>
                  <span>Total Amount</span>
                  <p className="text-xs text-light font-normal">All taxes included</p>
                </div>
                <span className="text-2xl font-bold text-primary">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <svg width="20" height="20" className="text-primary mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span className="text-[10px] font-semibold text-light leading-tight">Secure Payment</span>
                </div>

                <div className="flex flex-col items-center">
                  <svg width="20" height="20" className="text-primary mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <span className="text-[10px] font-semibold text-light leading-tight">Free Express Shipping</span>
                </div>

                <div className="flex flex-col items-center">
                  <svg width="20" height="20" className="text-primary mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                  </svg>
                  <span className="text-[10px] font-semibold text-light leading-tight">Easy Returns</span>
                </div>
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
