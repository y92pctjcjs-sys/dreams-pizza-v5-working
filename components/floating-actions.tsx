"use client";

import Link from "next/link";
import { shop } from "@/data/menu";
import { useCart } from "@/components/providers/cart-provider";

export function FloatingActions() {
  const { itemCount } = useCart();

  return (
    <div className="floating-actions">
      <a className="fab fab-dark" href={shop.phoneHref}>Appeler</a>
      <Link className="fab fab-primary" href="/commande">
        Panier {itemCount > 0 ? `(${itemCount})` : ""}
      </Link>
    </div>
  );
}
