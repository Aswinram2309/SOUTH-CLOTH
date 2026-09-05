import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '#SZ101',
    name: 'U.S. Polo Assn Denim Co. Hoodie',
    slug: 'us-polo-assn-denim-co-hoodie',
    category: 'hoodie',
    description: 'Heavyweight premium cotton hoodie featuring an embroidered polo logo. Relaxed fit for optimal comfort and streetwear styling.',
    isNew: true,
    variants: [
      {
        id: 'var_sz101_beige',
        colorName: 'Beige',
        colorHex: '#D5C4A1',
        price: 2499,
        stock: true,
        sizes: ['S', 'M', 'L', 'XL'],
        images: ['/studio/product_1.png']
      },
      {
        id: 'var_sz101_black',
        colorName: 'Black',
        colorHex: '#000000',
        price: 2499,
        stock: true,
        sizes: ['S', 'M', 'L', 'XL'],
        images: ['/studio/pro_1_2.png']
      }
    ]
  },
  {
    id: '#SZ102',
    name: 'Tree Embroidery Button-Up Shirt',
    slug: 'tree-embroidery-button-up-shirt',
    category: 'shirt',
    description: 'Premium casual button-up shirt featuring intricate forest tree embroidery across the bottom hem. Soft, breathable fabric perfect for a refined look.',
    variants: [
      {
        id: 'var_sz102_white',
        colorName: 'White',
        colorHex: '#ffffff',
        price: 1899,
        stock: true,
        sizes: ['S', 'M', 'L', 'XL'],
        images: ['/studio/pro_2.png']
      },
      {
        id: 'var_sz102_brown',
        colorName: 'Brown',
        colorHex: '#6B4E31',
        price: 1899,
        stock: true,
        sizes: ['S', 'M', 'L', 'XL'],
        images: ['/studio/pro_22.png']
      }
    ]
  },
  {
    id: '#SZ103',
    name: 'Baggy Jeans',
    slug: 'baggy-jeans',
    category: 'pants',
    description: 'Wide-leg baggy denim jeans crafted for a vintage, oversized streetwear look. Durable wash with deep utility pockets.',
    variants: [
      {
        id: 'var_sz103_blue',
        colorName: 'Blue',
        colorHex: '#4682B4',
        price: 2299,
        stock: true,
        sizes: ['30', '32', '34'],
        images: ['/studio/baggy blue.png']
      },
      {
        id: 'var_sz103_lightblue',
        colorName: 'Light Blue',
        colorHex: '#87CEEB',
        price: 2299,
        stock: true,
        sizes: ['30', '32', '34'],
        images: ['/studio/baggy lite blue .png']
      },
      {
        id: 'var_sz103_grey',
        colorName: 'Washed Grey',
        colorHex: '#708090',
        price: 2299,
        stock: true,
        sizes: ['30', '32', '34'],
        images: ['/studio/baggy ggrey.png']
      }
    ]
  },
  {
    id: '#SZ104',
    name: 'Red Bull x Porsche Racing Jacket',
    slug: 'red-bull-x-porsche-racing-jacket',
    category: 'jacket',
    description: 'Exclusive faux leather racing jacket featuring authentic Porsche, Solitude, and Aimé Leon Dore embroidery. Bold aesthetic with a tailored fit.',
    isNew: true,
    variants: [
      {
        id: 'var_sz104_black',
        colorName: 'Black',
        colorHex: '#000000',
        price: 3499,
        stock: true,
        sizes: ['S', 'M', 'L'],
        images: ['/studio/pro_4.png', '/studio/pro_4_front_.png', '/studio/pro_4_back.png']
      }
    ]
  }
];
