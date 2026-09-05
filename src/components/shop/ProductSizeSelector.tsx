import React from 'react';

interface ProductSizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  category: 'shirt' | 't-shirt' | 'hoodie' | 'pants';
}

export const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
  category,
}) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Size</h3>
        <button className="text-sm text-light underline hover:text-primary transition-colors">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`min-w-[3.5rem] h-12 px-3 flex items-center justify-center border-2 rounded-md font-semibold text-lg transition-all ${
                isSelected
                  ? 'border-primary bg-primary text-white shadow-md'
                  : 'border-border bg-white text-text hover:border-primary hover:text-primary'
              }`}
              aria-label={`Select size ${size}`}
              aria-pressed={isSelected}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
