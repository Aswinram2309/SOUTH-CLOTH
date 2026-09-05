import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center border border-border" style={{ borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
      <button 
        type="button"
        className="p-3 text-light hover:text-primary transition-fast"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center font-semibold">{quantity}</span>
      <button 
        type="button"
        className="p-3 text-light hover:text-primary transition-fast"
        onClick={onIncrease}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
