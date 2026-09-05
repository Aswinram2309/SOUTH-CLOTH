import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/south cloth logo .png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface pt-12 pb-6 mt-16 border-t">
      <div className="container grid md:grid-cols-4 gap-8 mb-8 text-sm">
        
        <div>
          <img src={logoImg} alt="Southzone Logo" style={{ height: '56px', objectFit: 'contain', marginBottom: '1rem' }} />
          <p className="text-light mb-4">Premium Indian streetwear brand delivering high-quality fashion directly to your door.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary font-semibold">Instagram</a>
            <a href="#" className="hover:text-primary font-semibold">Facebook</a>
            <a href="#" className="hover:text-primary font-semibold">Twitter</a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Shop</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="/shop" className="hover:text-primary text-light">All Products</Link></li>
            <li><Link to="/shop" className="hover:text-primary text-light">New Arrivals</Link></li>
            <li><Link to="/shop" className="hover:text-primary text-light">T-Shirts</Link></li>
            <li><Link to="/shop" className="hover:text-primary text-light">Jackets</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Customer Care</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="hover:text-primary text-light">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-primary text-light">Shipping & Returns</Link></li>
            <li><Link to="/" className="hover:text-primary text-light">Size Guide</Link></li>
            <li><Link to="/" className="hover:text-primary text-light">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Newsletter</h3>
          <p className="text-light mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="input-field text-sm" style={{ padding: '0.5rem' }} />
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Subscribe</button>
          </div>
        </div>

      </div>
      
      <div className="container text-center text-xs text-light pt-6 border-t">
        <p>&copy; {new Date().getFullYear()} Southzone. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
