export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  price: number;
  stock: boolean;
  sizes: string[];
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'shirt' | 't-shirt' | 'hoodie' | 'pants' | 'jacket';
  description: string;
  isNew?: boolean;
  variants: ProductVariant[];
}

export interface CartItem {
  id: string; // Unique ID for this cart item (productId + variantId + size)
  productId: string;
  productName: string;
  variantId: string;
  colorName: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}
