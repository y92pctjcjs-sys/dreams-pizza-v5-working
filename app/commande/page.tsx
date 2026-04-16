import Link from "next/link";
import { CheckoutForm } from "@/components/checkout-form";
import { OrderSummary } from "@/components/order-summary";
import { shop } from "@/data/menu";

export default function CommandePage() {
  return (
    <main className="section">
      <div className="container">
        <Link href="/" className="back-link">← Retour à la carte</Link>
        <div className="section-head top-gap">
          <h1>Finaliser la commande</h1>
          <p className="muted">Commande pensée pour le retrait à {shop.address}.</p>
        </div>
        <div className="checkout-layout">
          <CheckoutForm />
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
