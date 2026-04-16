"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";

type AddItemInput = Omit<CartItem, "cartId">;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddItemInput) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "dreams-pizza-v5-cart";
const CartContext = createContext<CartContextValue | null>(null);

function createCartId() {
  return Math.random().toString(36).slice(2, 11);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setItems(JSON.parse(raw));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    return {
      items,
      itemCount,
      subtotal,
      addItem: (input: AddItemInput) => {
        setItems((current) => {
          const sameIndex = current.findIndex(
            (item) =>
              item.id === input.id &&
              item.size === input.size &&
              item.dough === input.dough &&
              JSON.stringify(item.extras) === JSON.stringify(input.extras)
          );

          if (sameIndex >= 0) {
            const next = [...current];
            next[sameIndex] = {
              ...next[sameIndex],
              quantity: next[sameIndex].quantity + input.quantity
            };
            return next;
          }

          return [...current, { ...input, cartId: createCartId() }];
        });
      },
      removeItem: (cartId: string) => setItems((current) => current.filter((item) => item.cartId !== cartId)),
      clearCart: () => setItems([])
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
