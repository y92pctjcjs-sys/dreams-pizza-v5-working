import { shop } from "@/data/menu";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>{shop.name}</strong>
          <p className="muted">V5 de démonstration pensée pour être présentée à la pizzeria puis poussée facilement sur GitHub.</p>
        </div>
        <div>
          <strong>Adresse</strong>
          <p className="muted">{shop.address}</p>
        </div>
        <div>
          <strong>Téléphone</strong>
          <p className="muted">{shop.phoneDisplay}</p>
        </div>
      </div>
    </footer>
  );
}
