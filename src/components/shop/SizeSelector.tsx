import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSelect }) => {
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`flex items-center justify-center border transition-fast ${
              selectedSize === size 
                ? 'border-primary bg-primary text-white' 
                : 'border-border text-text hover:border-text'
            }`}
            style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
