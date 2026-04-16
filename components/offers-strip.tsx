import { menu } from "@/data/menu";
import { formatPrice } from "@/lib/format";

export function OffersStrip() {
  const offers = menu.filter((item) => item.category === "Offres" || item.category === "Menus");

  return (
    <section className="section" id="offres">
      <div className="container">
        <div className="section-head">
          <h2>Offres & menus</h2>
          <p className="muted">Les blocs qui doivent ressortir tout de suite pour convaincre sur mobile.</p>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className="panel offer-card" key={offer.id}>
              <span className="chip chip-soft">{offer.category}</span>
              <h3>{offer.name}</h3>
              <p className="muted">{offer.description}</p>
              <div className="price-large">{formatPrice(Object.values(offer.prices)[0] ?? 0)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
