"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/format";

export function OrderSummary({ compact = false }: { compact?: boolean }) {
  const { items, itemCount, subtotal, removeItem, clearCart } = useCart();

  return (
    <aside className="panel summary-card">
      <div className="summary-head">
        <div>
          <h3>Panier</h3>
          <p className="muted">{itemCount} article{itemCount > 1 ? "s" : ""}</p>
        </div>
        {items.length > 0 ? <button className="text-btn" onClick={clearCart}>Vider</button> : null}
      </div>

      <div className="summary-list">
        {items.length === 0 ? (
          <p className="muted">Le panier est vide. Ajoute une pizza, un menu ou une boisson.</p>
        ) : items.map((item) => (
          <div className="summary-item" key={item.cartId}>
            <div>
              <strong>{item.quantity} × {item.name}</strong>
              <div className="muted small">
                {item.size ? item.size.toUpperCase() : item.category}
                {item.dough ? ` • pâte ${item.dough}` : ""}
                {item.extras.length ? ` • ${item.extras.join(", ")}` : ""}
              </div>
            </div>
            <div className="summary-right">
              <span>{formatPrice(item.unitPrice * item.quantity)}</span>
              <button className="text-btn" onClick={() => removeItem(item.cartId)}>Retirer</button>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-total">
        <span>Sous-total</span>
        <strong>{formatPrice(subtotal)}</strong>
      </div>

      {!compact ? null : <Link href="/commande" className="btn btn-primary full">Finaliser la commande</Link>}
    </aside>
  );
}
