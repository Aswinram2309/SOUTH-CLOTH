export type Category = 'shirts' | 't-shirts' | 'pants' | 'accessories';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: Category;
  sizes: string[];
  images: string[];
  inStock: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '#SZ101',
    name: 'Essential Oversized Tee - Black',
    slug: 'essential-oversized-tee-black',
    price: 999,
    originalPrice: 1299,
    description: 'Premium heavyweight cotton oversized t-shirt featuring dropped shoulders and a relaxed fit. The perfect daily essential.',
    category: 't-shirts',
    sizes: ['M', 'L', 'XL'],
    images: ['/src/assets/images/pro 1(2).png', '/src/assets/images/pro 1 (2).png'],
    inStock: true,
    isNew: true,
  },
  {
    id: '#SZ102',
    name: 'Cargo Parachute Pants - Olive',
    slug: 'cargo-parachute-pants-olive',
    price: 1899,
    description: 'Lightweight parachute material with adjustable drawstrings at the waist and ankles. Relaxed baggy fit.',
    category: 'pants',
    sizes: ['30', '32', '34'],
    images: ['/src/assets/images/pro 2(2).png', '/src/assets/images/pro 2.png'],
    inStock: true,
  },
  {
    id: '#SZ103',
    name: 'Heavyweight Zip Hoodie',
    slug: 'heavyweight-zip-hoodie',
    price: 2499,
    originalPrice: 2999,
    description: 'Thick 400gsm cotton fleece zip-up hoodie. Features a slightly cropped, boxy fit with dropped shoulders.',
    category: 'shirts',
    sizes: ['M', 'L', 'XL'],
    images: ['/src/assets/images/pro 3(3).png', '/src/assets/images/pro 3 .png', '/src/assets/images/pro 3 (2).png'],
    inStock: true,
  },
  {
    id: '#SZ104',
    name: 'Washed Denim Jacket',
    slug: 'washed-denim-jacket',
    price: 3499,
    description: 'Vintage washed black denim jacket with subtle distressing. Boxy fit designed for layering.',
    category: 'shirts',
    sizes: ['M', 'L', 'XL'],
    images: ['/src/assets/images/pro 4.png', '/src/assets/images/pro 4 front .png', '/src/assets/images/pro 4 back.png'],
    inStock: true,
    isNew: true,
  },
  {
    id: '#SZ105',
    name: 'Graphic Print Resort Shirt',
    slug: 'graphic-print-resort-shirt',
    price: 1499,
    description: 'Lightweight rayon blend resort collar shirt with custom all-over graphic print. Perfect for summer.',
    category: 'shirts',
    sizes: ['M', 'L', 'XL'],
    images: ['/src/assets/images/product 1.png'],
    inStock: true,
  }
];
