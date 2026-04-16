"use client";

import { useMemo, useState } from "react";
import { extras, getPrice, pizzaDoughs, pizzaSizes, type MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import type { DoughValue, SizeValue } from "@/types/cart";
import { useCart } from "@/components/providers/cart-provider";

const pizzaCategories = new Set([
  "Pizzas Originales",
  "Pizzas Sauce Lovers",
  "Pizzas French Touch"
]);

export function ProductCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<SizeValue>("junior");
  const [dough, setDough] = useState<DoughValue>("classic");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const isPizza = pizzaCategories.has(item.category);
  const activePrice = useMemo(() => {
    const extrasAmount = selectedExtras.reduce((sum, label) => {
      const extra = extras.find((entry) => entry.label === label);
      return sum + (extra?.price ?? 0);
    }, 0);
    return (getPrice(item, isPizza ? size : undefined) + extrasAmount) * quantity;
  }, [isPizza, item, quantity, selectedExtras, size]);

  function toggleExtra(label: string) {
    setSelectedExtras((current) => current.includes(label) ? current.filter((entry) => entry !== label) : [...current, label]);
  }

  function handleAdd() {
    addItem({
      id: item.id,
      name: item.name,
      category: item.category,
      size: isPizza ? size : undefined,
      dough: isPizza ? dough : undefined,
      extras: isPizza ? selectedExtras : [],
      quantity,
      unitPrice: activePrice / quantity
    });
    setQuantity(1);
    setSelectedExtras([]);
    setSize("junior");
    setDough("classic");
  }

  return (
    <article className="panel product-card">
      <div className="product-head">
        <div>
          <h3>{item.name}</h3>
          <div className="tag-row">
            {item.popular ? <span className="mini-tag">Populaire</span> : null}
            {item.spicy ? <span className="mini-tag">Épicée</span> : null}
            {item.vegetarian ? <span className="mini-tag">Végétarienne</span> : null}
          </div>
        </div>
        <strong className="price">{formatPrice(getPrice(item, isPizza ? size : undefined))}</strong>
      </div>

      <p className="muted">{item.description}</p>

      {isPizza ? (
        <div className="config-block">
          <label>Taille</label>
          <div className="size-picker">
            {pizzaSizes.map((entry) => (
              <button
                key={entry.value}
                type="button"
                className={`size-pill ${size === entry.value ? "active" : ""}`}
                onClick={() => setSize(entry.value)}
              >
                {entry.label} <span>{entry.diameter}</span>
              </button>
            ))}
          </div>

          <label>Pâte</label>
          <div className="extras-grid">
            {pizzaDoughs.map((entry) => (
              <button
                key={entry.value}
                type="button"
                className={`extra-pill ${dough === entry.value ? "active" : ""}`}
                onClick={() => setDough(entry.value)}
              >
                {entry.label}
              </button>
            ))}
          </div>

          <label>Suppléments</label>
          <div className="extras-grid">
            {extras.map((extra) => (
              <button
                key={extra.label}
                type="button"
                className={`extra-pill ${selectedExtras.includes(extra.label) ? "active" : ""}`}
                onClick={() => toggleExtra(extra.label)}
              >
                {extra.label} (+{formatPrice(extra.price)})
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="product-actions">
        <div className="qty-box">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAdd}>
          Ajouter • {formatPrice(activePrice)}
        </button>
      </div>
    </article>
  );
}
