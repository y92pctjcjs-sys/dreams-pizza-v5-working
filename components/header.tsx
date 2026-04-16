import Link from "next/link";
import { shop } from "@/data/menu";

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <div className="brand-mark">DP</div>
          <div>
            <strong>{shop.name}</strong>
            <div className="muted">Commande à retirer • {shop.city}</div>
          </div>
        </Link>

        <nav className="nav">
          <a href="#offres">Offres</a>
          <a href="#carte">Carte</a>
          <a href="#infos">Infos</a>
          <Link href="/commande" className="btn btn-primary">Commander</Link>
        </nav>
      </div>
    </header>
  );
}
