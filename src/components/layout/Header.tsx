import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import logoImg from '../../assets/images/south cloth logo .png';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, toggleCartDrawer } = useCart();

  return (
    <header className="sticky top-0 bg-white border-b" style={{ zIndex: 100 }}>
      <div className="container py-4 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center">
          <img src={logoImg} alt="Southzone Logo" style={{ height: '54px', objectFit: 'contain' }} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="mobile-hide flex gap-6 font-semibold">
          <Link to="/" className="hover:text-primary transition-fast">Home</Link>
          <Link to="/shop" className="hover:text-primary transition-fast">Shop</Link>
          <Link to="/shop" className="hover:text-primary transition-fast">Latest Drops</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="mobile-hide p-2 hover:bg-surface rounded-full transition-fast">
            <Search size={20} />
          </button>
          <button 
            className="p-2 hover:bg-surface rounded-full transition-fast relative"
            onClick={() => toggleCartDrawer(true)}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 animate-fade-in" style={{ zIndex: 200, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="flex justify-between items-center mb-8">
            <img src={logoImg} alt="Southzone Logo" style={{ height: '50px', objectFit: 'contain' }} />
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>
          
          <div className="mb-6 relative">
            <input type="text" placeholder="Search products..." className="input-field pl-10" />
            <Search className="absolute left-3 top-3 text-light" size={20} />
          </div>

          <nav className="flex flex-col gap-6 text-xl font-bold">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Hoodies & Jackets</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>T-Shirts</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Bottoms</Link>
          </nav>
        </div>
      )}
    </header>
  );
};
