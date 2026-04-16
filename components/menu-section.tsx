"use client";

import { useMemo, useState } from "react";
import { categories, menu } from "@/data/menu";
import { ProductCard } from "@/components/product-card";

export function MenuSection() {
  const [active, setActive] = useState<string>("Toutes");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return menu.filter((item) => {
      const categoryOk = active === "Toutes" || item.category === active;
      const searchOk = !search || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(search);
      return categoryOk && searchOk;
    });
  }, [active, query]);

  return (
    <section className="section" id="carte">
      <div className="container">
        <div className="section-head">
          <h2>Carte Dreams Pizza</h2>
          <p className="muted">Tu peux filtrer la carte ou chercher une pizza pour montrer une navigation plus rapide dès la démo.</p>
        </div>

        <input
          className="input"
          type="search"
          placeholder="Rechercher une pizza, un menu, une boisson…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="filters">
          <button type="button" className={`filter ${active === "Toutes" ? "active" : ""}`} onClick={() => setActive("Toutes")}>Toutes</button>
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`filter ${active === category ? "active" : ""}`}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filtered.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
