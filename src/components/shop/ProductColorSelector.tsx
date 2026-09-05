import React from 'react';
import type { ProductVariant } from '../../types';

interface ProductColorSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onVariantSelect: (variant: ProductVariant) => void;
}

export const ProductColorSelector: React.FC<ProductColorSelectorProps> = ({
  variants,
  selectedVariantId,
  onVariantSelect,
}) => {
  if (variants.length <= 1) {
    return null; // Don't show color selector if there is only 1 variant
  }

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

  return (
    <div className="mb-6 animate-fade-in">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        Color: <span className="text-light">{selectedVariant.colorName}</span>
      </h3>
      <div className="flex flex-wrap gap-4">
        {variants.map((v) => {
          const isSelected = selectedVariantId === v.id;
          return (
            <button
              key={v.id}
              onClick={() => onVariantSelect(v)}
              className={`w-16 h-20 rounded border-2 overflow-hidden transition-all ${
                isSelected
                  ? 'border-primary shadow-lg transform scale-105'
                  : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
              }`}
              title={v.colorName}
              aria-label={`Select color ${v.colorName}`}
              aria-pressed={isSelected}
            >
              <img
                src={v.images[0]}
                alt={v.colorName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
