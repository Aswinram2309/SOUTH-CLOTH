import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, MessageCircle, Truck, RefreshCw, Star } from 'lucide-react';
import { mockProducts } from '../utils/mockData';
import { useCart } from '../context/CartContext';
import type { Product, ProductVariant } from '../types';
import { ProductColorSelector } from '../components/shop/ProductColorSelector';
import { ProductSizeSelector } from '../components/shop/ProductSizeSelector';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    // In a real app, this would be an API call
    const found = mockProducts.find(p => p.slug === id);
    if (found && found.variants.length > 0) {
      setProduct(found);
      const defaultVariant = found.variants[0];
      setSelectedVariant(defaultVariant);
      setSelectedSize(defaultVariant.sizes[0] || '');
      setMainImage(defaultVariant.images[0]);
      setQuantity(1);
      window.scrollTo(0, 0);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product || !selectedVariant) return <div className="p-12 text-center">Loading...</div>;

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setMainImage(variant.images[0]);
    if (!variant.sizes.includes(selectedSize)) {
      setSelectedSize(variant.sizes[0] || '');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({
      id: `${product.id}-${selectedVariant.id}-${selectedSize}`,
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant.id,
      colorName: selectedVariant.colorName,
      size: selectedSize,
      quantity,
      price: selectedVariant.price,
      image: selectedVariant.images[0]
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const itemToBuy = {
      id: `${product.id}-${selectedVariant.id}-${selectedSize}`,
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant.id,
      colorName: selectedVariant.colorName,
      size: selectedSize,
      quantity,
      price: selectedVariant.price,
      image: selectedVariant.images[0]
    };
    
    navigate('/checkout', { state: { cartItems: [itemToBuy] } });
  };

  const handleWhatsApp = () => {
    if (!selectedSize) {
      alert('Please select a size before ordering via WhatsApp');
      return;
    }
    
    const text = `Hi, I would like to order:\n\nProduct: ${product.name}\nProduct ID: ${product.id}\nColor: ${selectedVariant.colorName}\nSize: ${selectedSize}\nQuantity: ${quantity}\nPrice: ₹${selectedVariant.price.toLocaleString('en-IN')}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="container py-6 md:py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
        
        {/* LEFT COLUMN: Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-3">
          <div 
            className="product-main-img-box bg-surface rounded-lg overflow-hidden relative flex items-center justify-center border border-border w-full"
          >
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-full object-contain p-3 transition-opacity duration-300"
            />
            {product.isNew && (
              <div className="absolute top-3 left-3">
                <span className="badge badge-new text-xs px-2.5 py-1">New Arrival</span>
              </div>
            )}
          </div>
          
          {/* Thumbnails of current variant */}
          {selectedVariant.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {selectedVariant.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 bg-surface p-1 transition-all ${
                    mainImage === img 
                      ? 'border-primary opacity-100' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Product Name & ID */}
          <div className="flex flex-col mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-1 leading-tight">{product.name}</h1>
            <div className="text-sm font-medium text-light/70">{product.id}</div>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-sm text-light">(124 reviews)</span>
          </div>
          
          {/* Price */}
          <div className="text-3xl font-bold mb-8">₹{selectedVariant.price.toLocaleString('en-IN')}</div>

          {/* Color Selection */}
          <ProductColorSelector 
            variants={product.variants}
            selectedVariantId={selectedVariant.id}
            onVariantSelect={handleVariantChange}
          />

          {/* Size Selection */}
          <ProductSizeSelector 
            sizes={selectedVariant.sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
            category={product.category}
          />

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center border-2 border-border rounded-md w-max">
              <button 
                className="px-4 py-3 hover:bg-surface transition-colors font-medium text-lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-5 py-3 font-semibold text-lg min-w-[4rem] text-center border-x-2 border-border">
                {quantity}
              </span>
              <button 
                className="px-4 py-3 hover:bg-surface transition-colors font-medium text-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex flex-col gap-4 mb-8">
            <div className="flex gap-4">
              <button onClick={handleAddToCart} className="btn btn-outline flex-1 py-4 text-lg font-bold">
                <ShoppingBag size={20} className="mr-2" /> Add to Cart
              </button>
              <button onClick={handleBuyNow} className="btn btn-primary flex-1 py-4 text-lg font-bold">
                Buy Now
              </button>
            </div>
            <button 
              onClick={handleWhatsApp} 
              className="btn btn-outline w-full py-4 text-lg font-bold border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
            >
              <MessageCircle size={22} className="mr-2" /> Order via WhatsApp
            </button>
          </div>

          {/* Description */}
          <div className="border-t border-border pt-8 mb-6">
            <h3 className="font-bold text-lg mb-3">Product Description</h3>
            <p className="text-light text-base leading-relaxed">{product.description}</p>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 border-t border-border pt-8 mb-24 md:mb-0">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface rounded-full text-primary">
                <Truck size={24} />
              </div>
              <div>
                <p className="font-bold text-base">Free Express Shipping</p>
                <p className="text-light text-sm mt-1">Delivered within 3-5 business days across India.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface rounded-full text-primary">
                <RefreshCw size={24} />
              </div>
              <div>
                <p className="font-bold text-base">7 Days Return</p>
                <p className="text-light text-sm mt-1">Easy returns and exchanges if the fit isn't perfect.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Actions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex gap-3 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button onClick={handleAddToCart} className="btn btn-outline flex-1 py-3 text-sm font-bold">
          Add to Cart
        </button>
        <button onClick={handleBuyNow} className="btn btn-primary flex-1 py-3 text-sm font-bold">
          Buy Now
        </button>
      </div>
    </div>
  );
};

