"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/cart-provider";
import { shop } from "@/data/menu";
import { formatPrice } from "@/lib/format";

type PaymentMode = "cash" | "card";
const PROFILE_STORAGE_KEY = "dreams-pizza-v5-customer";

type CustomerProfile = {
  phone: string;
  name: string;
  pickupTime: string;
  note: string;
};

const defaultForm: CustomerProfile = {
  phone: "",
  name: "",
  pickupTime: "Dès que possible",
  note: ""
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<CustomerProfile>(defaultForm);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<CustomerProfile>;
      setForm({ ...defaultForm, ...parsed });
    } catch {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, []);

  const isValid = useMemo(() => {
    if (items.length === 0) return false;
    if (form.phone.trim().replace(/\D/g, "").length < 10) return false;
    if (form.name.trim().length < 2) return false;
    return true;
  }, [form.name, form.phone, items.length]);

  async function persistOrder() {
    const payload = {
      customer: form,
      paymentMode,
      fulfillment: "pickup",
      items,
      subtotal
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({ error: "Erreur de sauvegarde." }));
      throw new Error(data.error ?? "Erreur de sauvegarde.");
    }

    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(form));
    window.localStorage.setItem("dreams-pizza-v5-last-order", JSON.stringify(payload));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");

    try {
      if (paymentMode === "cash") {
        await persistOrder();
        clearCart();
        setSuccess(true);
        return;
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items, subtotal })
      });

      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Impossible de créer la session de paiement.");
      }
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(form));
      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="panel checkout-card">
        <h2>Commande enregistrée</h2>
        <p className="muted">
          La commande de retrait a été sauvegardée. Le profil client est mémorisé localement pour accélérer la prochaine commande.
        </p>
        <div className="success-box">
          <div><strong>Client :</strong> {form.name}</div>
          <div><strong>Téléphone :</strong> {form.phone}</div>
          <div><strong>Retrait :</strong> {form.pickupTime}</div>
          <div><strong>Total :</strong> {formatPrice(subtotal)}</div>
          <div><strong>Adresse :</strong> {shop.address}</div>
        </div>
      </div>
    );
  }

  return (
    <form className="panel checkout-card" onSubmit={handleSubmit}>
      <h2>Retrait à la pizzeria</h2>
      <p className="muted">Numéro de téléphone en premier, puis nom, heure de retrait et paiement. C'est la version la plus simple à montrer à la pizzeria.</p>

      <div className="field-grid">
        <div>
          <label htmlFor="phone">Numéro de téléphone *</label>
          <input id="phone" className="input" type="tel" inputMode="tel" placeholder="06 12 34 56 78" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>

        <div>
          <label htmlFor="name">Nom *</label>
          <input id="name" className="input" type="text" placeholder="Nom de commande" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div>
          <label htmlFor="pickupTime">Heure de retrait</label>
          <select id="pickupTime" className="input" value={form.pickupTime} onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}>
            <option>Dès que possible</option>
            <option>Dans 20 minutes</option>
            <option>Dans 30 minutes</option>
            <option>Dans 45 minutes</option>
          </select>
        </div>

        <div>
          <label>Paiement</label>
          <div className="choice-row">
            <button type="button" className={`choice ${paymentMode === "cash" ? "active" : ""}`} onClick={() => setPaymentMode("cash")}>Espèces au retrait</button>
            <button type="button" className={`choice ${paymentMode === "card" ? "active" : ""}`} onClick={() => setPaymentMode("card")}>Payer par carte</button>
          </div>
        </div>

        <div>
          <label htmlFor="note">Note de commande</label>
          <textarea id="note" className="textarea" placeholder="Sans olives, bien cuite, etc." value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        </div>

        {error ? <div className="error-box">{error}</div> : null}
        <button className="btn btn-primary full" type="submit" disabled={!isValid || loading}>
          {loading ? "Chargement..." : paymentMode === "card" ? `Payer ${formatPrice(subtotal)}` : `Confirmer ${formatPrice(subtotal)}`}
        </button>
      </div>
    </form>
  );
}
