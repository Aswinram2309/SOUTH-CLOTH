import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCartDrawer, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    toggleCartDrawer(false);
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => toggleCartDrawer(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => toggleCartDrawer(false)} className="p-2 hover:bg-surface rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-light">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <button 
                onClick={() => toggleCartDrawer(false)}
                className="btn btn-outline mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-border pb-4 last:border-0">
                  <div className="w-24 h-32 flex-shrink-0 bg-surface rounded overflow-hidden relative">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-light mb-1">{item.productId}</div>
                        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{item.productName}</h3>
                        <div className="text-xs text-light">Color: {item.colorName} | Size: {item.size}</div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-light hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center border border-border rounded">
                        <button 
                          className="px-2 py-1 text-lg hover:bg-surface transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium border-x border-border">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-lg hover:bg-surface transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 bg-surface">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-light mb-4 text-center">Shipping & taxes calculated at checkout</p>
            <button 
              className="btn btn-primary btn-full py-4 text-lg"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
