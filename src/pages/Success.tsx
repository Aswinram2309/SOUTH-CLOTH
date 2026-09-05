import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import type { CartItem } from '../types';
import { useCart } from '../context/CartContext';

export const Success: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleCartDrawer } = useCart();
  const [copied, setCopied] = useState(false);
  
  const state = location.state as { 
    orderId?: string; 
    cartItems?: CartItem[]; 
    total?: number;
    paymentMethod?: string;
    shippingDetails?: {
      fullName?: string;
      phone?: string;
      email?: string;
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
    };
  } | null;

  useEffect(() => {
    // Close cart drawer if open
    toggleCartDrawer(false);
  }, [toggleCartDrawer]);

  if (!state || !state.orderId) {
    return (
      <div className="bg-surface min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-light">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">No Recent Order Found</h2>
          <p className="text-light text-sm mb-6">It looks like you reached this page directly or your session expired.</p>
          <button className="btn btn-primary btn-full" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const { orderId, cartItems, total, paymentMethod, shippingDetails } = state;

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate estimated delivery date (3-5 days from today)
  const deliveryStartDate = new Date();
  deliveryStartDate.setDate(deliveryStartDate.getDate() + 3);
  const deliveryEndDate = new Date();
  deliveryEndDate.setDate(deliveryEndDate.getDate() + 5);

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-surface min-h-screen py-10 px-4">
      <div className="container max-w-3xl mx-auto">
        
        {/* Main Success Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
          
          {/* Green Confirmation Header */}
          <div className="bg-white p-8 md:p-10 text-center border-b">
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-success">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <span className="inline-block bg-surface text-success text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-\[\#25D366\]">
              Order Confirmed 🎉
            </span>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-2">
              Thank You For Your Order!
            </h1>
            <p className="text-light text-sm max-w-md mx-auto">
              We've received your order and are getting it ready for shipment. A confirmation summary has been logged.
            </p>

            {/* Order ID & Delivery Date Banner */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-surface px-4 py-3 rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <span className="text-xs text-light font-medium">Order Reference:</span>
                <span className="font-bold text-sm text-black">{orderId}</span>
                <button 
                  onClick={handleCopyOrderId}
                  className="text-xs text-primary font-semibold hover:underline ml-1"
                  title="Copy Order ID"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <span className="text-border mobile-hide">|</span>
              <div className="flex items-center gap-1.5 text-xs text-light">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>Estimated Delivery: <strong>{formatDate(deliveryStartDate)} - {formatDate(deliveryEndDate)}</strong></span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col gap-6">
            
            {/* Grid: Shipping & Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface p-6 rounded-lg border border-border">
              
              {/* Shipping Address */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-light mb-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Delivery Address
                </h3>
                {shippingDetails && shippingDetails.fullName ? (
                  <div className="text-sm">
                    <p className="font-bold text-black">{shippingDetails.fullName}</p>
                    <p className="text-light">{shippingDetails.address}</p>
                    <p className="text-light">{shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pincode}</p>
                    <p className="text-light mt-1">📞 {shippingDetails.phone}</p>
                  </div>
                ) : (
                  <div className="text-sm text-light">
                    <p className="font-semibold text-black">Standard Express Delivery</p>
                    <p>Address details saved to order record.</p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-light mb-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                  Payment Information
                </h3>
                <div className="text-sm">
                  <p className="font-bold text-black uppercase">
                    {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'upi' ? 'Online Payment / UPI' : 'Direct Order'}
                  </p>
                  <p className="text-xs text-success font-medium mt-1">
                    {paymentMethod === 'cod' ? '• Pay cash upon package delivery' : '• Payment Status: Verified / Authorized'}
                  </p>
                </div>
              </div>

            </div>

            {/* Items Summary */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-black border-b pb-2">Items Purchased</h3>
              
              {cartItems && cartItems.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex items-center justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.productName} 
                          className="w-16 h-20 object-cover rounded border border-border flex-shrink-0" 
                        />
                        <div>
                          <h4 className="font-bold text-sm text-black line-clamp-1">{item.productName}</h4>
                          <div className="flex items-center gap-2 text-xs text-light mt-1">
                            {item.colorName && (
                              <span>Color: <strong className="text-black">{item.colorName}</strong></span>
                            )}
                            {item.size && (
                              <span>• Size: <strong className="text-black">{item.size}</strong></span>
                            )}
                            <span>• Qty: <strong className="text-black">{item.quantity}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-sm text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        {item.quantity > 1 && (
                          <p className="text-[11px] text-light">₹{item.price.toLocaleString('en-IN')} each</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-light">Order items details recorded.</p>
              )}
            </div>

            {/* Payment Breakdown */}
            <div className="border-t pt-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-light">
                <span>Subtotal</span>
                <span className="font-semibold text-black">₹{total?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-light">
                <span>Shipping Fee</span>
                <span className="font-bold text-success text-xs bg-surface px-2 py-0.5 rounded">FREE</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-3 mt-1 text-black">
                <span>Total Amount Paid</span>
                <span className="text-2xl font-bold text-primary">₹{total?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions & WhatsApp Support */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-4 border-t">
              <button 
                className="btn btn-primary flex-1 py-3 text-base"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
              
              <a 
                href="https://wa.me/919000000000?text=Hi%20Southzone%2C%20I%20have%20a%20question%20about%20my%20order" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline flex-1 py-3 text-base flex items-center justify-center gap-2 border-\[\#25D366\] text-\[\#25D366\] hover:bg-\[\#25D366\] hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.51 1.036 3.53l-.679 2.48 2.541-.666c.983.536 2.109.845 3.303.846 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.769-5.768-5.769zm3.385 8.167c-.147.415-.729.76-1.02.793-.27.03-.62.062-1.764-.411-1.465-.605-2.408-2.091-2.482-2.19-.073-.098-.598-.797-.598-1.52 0-.723.379-1.08.514-1.227.135-.147.294-.184.392-.184.098 0 .196.001.282.005.091.004.214-.035.334.254.123.298.416 1.018.453 1.092.037.074.062.16.012.257-.049.098-.074.16-.147.245-.073.086-.154.192-.22.258-.074.074-.15.155-.065.302.086.147.38 0.627.817 1.016.562.5 1.036.657 1.183.73.147.073.233.061.32-.037.086-.098.368-.429.466-.576.098-.147.196-.123.332-.074.135.049.858.404 1.005.478.147.074.245.11.282.172.037.062.037.356-.11.771z"/>
                </svg>
                Track / Support on WhatsApp
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
