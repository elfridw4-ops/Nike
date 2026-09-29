/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductUsage = 'route' | 'trail' | 'piste' | 'recuperation';

export type ProductGender = 'homme' | 'femme' | 'unisexe';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  sport: string;
  title: string;
  comment: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductSpecs {
  drop: string;
  weight: string;
  cushioning: string;
  surface: string;
  distance: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'Running' | 'Training' | 'Trail' | 'Lifestyle';
  usage: ProductUsage;
  gender: ProductGender;
  price: number; // in FCFA
  originalPrice?: number; // in FCFA (if promo)
  isNew?: boolean;
  isPopular?: boolean;
  seriesNumber?: string; // e.g. "01", "02"
  rating: number;
  reviewsCount: number;
  descriptionShort: string;
  descriptionLong: {
    benefits: string[];
    technical: string;
    usageNote: string;
  };
  specs: ProductSpecs;
  sizes: {
    size: number;
    inStock: boolean;
    stockCount?: number;
  }[];
  colors: ProductColor[];
  gallery: string[];
  reviews: ProductReview[];
  faq: ProductFAQ[];
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  selectedColor: ProductColor;
  quantity: number;
}
