import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../utils/mockData';
import { ProductCard } from '../components/shop/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-surface py-16 text-center border-b">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Elevate Your Style</h1>
          <p className="text-lg text-light mb-8 max-w-2xl mx-auto">
            Discover the latest trends in premium streetwear. Southzone brings you high-quality fabrics, bold designs, and unmatched comfort.
          </p>
          <Link to="/shop" className="btn btn-primary text-lg">
            Shop New Arrivals
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['T-Shirts', 'Hoodies', 'Jackets', 'Pants'].map((cat) => (
              <Link to="/shop" key={cat} className="card p-6 text-center flex flex-col items-center justify-center bg-surface hover:bg-surface-hover transition-fast" style={{ height: '150px' }}>
                <span className="font-bold text-lg">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold">Latest Drops</h2>
            <Link to="/shop" className="text-sm font-semibold hover:text-primary transition-fast">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="py-16 bg-surface border-t border-b">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Born in the Streets</h2>
          <p className="text-light max-w-xl mx-auto mb-6">
            Southzone is more than just clothing. It's a lifestyle. We focus on premium quality, heavy fabrics, and designs that stand out in any crowd.
          </p>
          <img src="/logo/south_zone_logo.jpg" alt="Southzone Logo" style={{ height: '80px', objectFit: 'contain', margin: '0 auto' }} />
        </div>
      </section>
    </div>
  );
};
