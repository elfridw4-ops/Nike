/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { CartItem, Product, ProductColor } from '../types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  bounceTrigger: number;
  lastAddedName: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: number, color: ProductColor, quantity?: number) => void;
  removeItem: (productId: string, size: number, colorName: string) => void;
  updateQuantity: (productId: string, size: number, colorName: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  bounceTrigger: 0,
  lastAddedName: null,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, size, color, quantity = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [
          ...state.items,
          {
            product,
            selectedSize: size,
            selectedColor: color,
            quantity
          }
        ];
      }

      return {
        items: newItems,
        isOpen: true,
        bounceTrigger: state.bounceTrigger + 1,
        lastAddedName: product.name
      };
    });
  },

  removeItem: (productId, size, colorName) => {
    set((state) => ({
      items: state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    }));
  },

  updateQuantity: (productId, size, colorName, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size, colorName);
      return;
    }
    set((state) => ({
      items: state.items.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}));
