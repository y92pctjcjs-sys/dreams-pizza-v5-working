import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="section">
      <div className="container narrow">
        <div className="panel checkout-card">
          <h1>Paiement validé</h1>
          <p className="muted">
            La session Stripe s'est terminée avec succès. Il reste à brancher la confirmation côté restaurant si tu veux transformer cette démo en version de production.
          </p>
          <Link href="/" className="btn btn-primary">Retour à l'accueil</Link>
        </div>
      </div>
    </main>
  );
}
