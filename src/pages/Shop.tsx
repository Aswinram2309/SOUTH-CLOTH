import React, { useState } from 'react';
import { mockProducts } from '../utils/mockData';
import { ProductCard } from '../components/shop/ProductCard';

export const Shop: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredProducts = filter === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => {
        if (filter === 't-shirt') return p.category === 't-shirt' || p.category === 'shirt';
        if (filter === 'hoodie') return p.category === 'hoodie' || p.category === 'jacket';
        return p.category === filter;
      });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Shop Collection</h1>
      <p className="text-light mb-8">Browse our complete collection of premium streetwear.</p>
      
      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setFilter('all')} 
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('t-shirt')} 
          className={`btn ${filter === 't-shirt' ? 'btn-primary' : 'btn-outline'}`}
        >
          T-Shirts
        </button>
        <button 
          onClick={() => setFilter('hoodie')} 
          className={`btn ${filter === 'hoodie' ? 'btn-primary' : 'btn-outline'}`}
        >
          Hoodies & Jackets
        </button>
        <button 
          onClick={() => setFilter('pants')} 
          className={`btn ${filter === 'pants' ? 'btn-primary' : 'btn-outline'}`}
        >
          Bottoms
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-light text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};
