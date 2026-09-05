import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const defaultVariant = product.variants[0];
  
  if (!defaultVariant) return null;

  return (
    <Link to={`/product/${product.slug}`} className="card block h-full flex-col">
      <div className="relative aspect-product bg-surface overflow-hidden">
        <img 
          src={defaultVariant.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-fast hover:scale-105"
          style={{ transition: 'transform 0.5s ease' }}
        />
        {product.isNew && (
          <div className="absolute top-2 left-2">
            <span className="badge badge-new">New</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-light mb-1">{product.id} • {product.category.toUpperCase()}</div>
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-auto">
          <div className="font-bold text-lg mb-2">₹{defaultVariant.price.toLocaleString('en-IN')}</div>
          
          <div className="text-xs text-light flex items-center justify-between">
            <span>Sizes: {defaultVariant.sizes.join(' ')}</span>
            {product.variants.length > 1 && (
              <span className="font-medium text-primary">{product.variants.length} Colors</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
