import React from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../utils/mockData';
import { ProductCard } from '../components/shop/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-surface border-b overflow-hidden">
        <div className="container py-6 md:py-12">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 md:gap-12">
            
            {/* Hero Visual - Authentic South Zone Model Asset */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div 
                className="w-full relative overflow-hidden"
                style={{
                  borderRadius: '8px',
                  backgroundColor: '#111111',
                  border: '1px solid var(--color-border)'
                }}
              >
                <img 
                  src="/studio/pro_4.png" 
                  alt="South Zone Streetwear Collection" 
                  className="hero-img w-full object-cover"
                  style={{
                    objectPosition: 'center 15%',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
              <span 
                className="text-xs font-bold tracking-widest text-primary uppercase mb-2"
                style={{ letterSpacing: '0.15em' }}
              >
                Streetwear Collection
              </span>
              <h1 
                className="font-bold mb-3"
                style={{ 
                  fontSize: 'clamp(1.85rem, 4.5vw, 3rem)',
                  lineHeight: 1.15,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-black)'
                }}
              >
                OWN YOUR LOOK.<br />
                <span style={{ color: 'var(--color-primary)' }}>OWN YOUR ZONE.</span>
              </h1>
              <p 
                className="text-light mb-6"
                style={{ 
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                  lineHeight: 1.5,
                  maxWidth: '380px'
                }}
              >
                Discover the latest streetwear drops.<br />
                Built for everyday style.
              </p>
              <Link 
                to="/shop" 
                className="btn btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  borderRadius: '4px'
                }}
              >
                SHOP NEW DROPS
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b">
        <div className="container text-center">
          <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {['T-Shirts', 'Hoodies', 'Jackets', 'Pants'].map((cat) => (
              <Link
                to="/shop"
                key={cat}
                className="btn btn-outline"
                style={{
                  borderRadius: '9999px',
                  padding: '8px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {cat}
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
