import { featuredPizzaIds, menu } from "@/data/menu";
import { formatPrice } from "@/lib/format";

export function FeaturedPizzas() {
  const pizzas = featuredPizzaIds
    .map((id) => menu.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Les pizzas qui donnent tout de suite envie</h2>
          <p className="muted">Sélection mise en avant pour une démo plus convaincante face à la pizzeria.</p>
        </div>
        <div className="featured-grid">
          {pizzas.map((item) => item ? (
            <article className="panel featured-card" key={item.id}>
              <span className="chip chip-soft">{item.category}</span>
              <h3>{item.name}</h3>
              <p className="muted">{item.description}</p>
              <div className="featured-price">Dès {formatPrice(item.prices.junior ?? 0)}</div>
            </article>
          ) : null)}
        </div>
      </div>
    </section>
  );
}
