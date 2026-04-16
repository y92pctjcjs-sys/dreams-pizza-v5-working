import Link from "next/link";
import { pizzaDoughs, pizzaSizes, shop } from "@/data/menu";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="panel hero-main">
          <span className="eyebrow">Dream's Pizza Joigny • commande à retirer</span>
          <h1>Une V5 plus proche d'un vrai site de commande pizzeria.</h1>
          <p className="muted lead">
            Carte riche, 3 tailles, 3 types de pâte, offres de retrait, checkout centré téléphone et paiement carte branchable avec Stripe.
          </p>

          <div className="hero-badges">
            <span className="chip chip-hot">{shop.heroOffer}</span>
            <span className="chip">Prêt en {shop.pickupLeadMin}–{shop.pickupLeadMax} min</span>
            <span className="chip">Retrait à {shop.city}</span>
          </div>

          <div className="hero-actions">
            <Link href="/commande" className="btn btn-primary">Commander maintenant</Link>
            <a href={shop.phoneHref} className="btn btn-secondary">Appeler la pizzeria</a>
          </div>
        </div>

        <div className="panel hero-side">
          <h2>Tailles & pâtes</h2>
          <div className="size-grid">
            {pizzaSizes.map((size) => (
              <div className="size-card" key={size.value}>
                <strong>{size.label}</strong>
                <span>{size.diameter}</span>
                <small>{size.multiplierHint}</small>
              </div>
            ))}
          </div>

          <div className="hours-card" id="infos">
            <strong>Types de pâte</strong>
            <p>{pizzaDoughs.map((d) => d.label).join(" • ")}</p>
            <strong>Adresse</strong>
            <p>{shop.address}</p>
            <strong>Horaires publics</strong>
            <ul>
              {shop.hours.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
