import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!stripeSecret) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY manquante." }, { status: 500 });
    }
    if (!siteUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL manquante." }, { status: 500 });
    }

    const body = await request.json();
    const items = body?.items;
    const customer = body?.customer;

    if (!Array.isArray(items) || items.length === 0 || !customer?.phone || !customer?.name) {
      return NextResponse.json({ error: "Données de commande invalides." }, { status: 400 });
    }

    const lineItems = items.map((item: { name: string; quantity: number; unitPrice: number; size?: string; dough?: string; extras?: string[] }) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          description: [
            item.size ? `Taille: ${item.size}` : null,
            item.dough ? `Pâte: ${item.dough}` : null,
            item.extras?.length ? `Suppléments: ${item.extras.join(", ")}` : null
          ].filter(Boolean).join(" • ") || undefined
        },
        unit_amount: Math.round(item.unitPrice * 100)
      },
      quantity: item.quantity
    }));

    const form = new URLSearchParams();
    form.set("mode", "payment");
    form.set("success_url", `${siteUrl}/success`);
    form.set("cancel_url", `${siteUrl}/commande`);
    form.set("payment_method_types[0]", "card");
    form.set("metadata[customer_name]", customer.name);
    form.set("metadata[customer_phone]", customer.phone);
    form.set("metadata[fulfillment]", "pickup");

    lineItems.forEach((item, index) => {
      form.set(`line_items[${index}][price_data][currency]`, item.price_data.currency);
      form.set(`line_items[${index}][price_data][product_data][name]`, item.price_data.product_data.name);
      if (item.price_data.product_data.description) {
        form.set(`line_items[${index}][price_data][product_data][description]`, item.price_data.product_data.description);
      }
      form.set(`line_items[${index}][price_data][unit_amount]`, String(item.price_data.unit_amount));
      form.set(`line_items[${index}][quantity]`, String(item.quantity));
    });

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form.toString()
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data?.error?.message ?? "Stripe a refusé la création de session." }, { status: 500 });
    }

    return NextResponse.json({ url: data.url, id: data.id });
  } catch {
    return NextResponse.json({ error: "Impossible de créer la session Stripe." }, { status: 500 });
  }
}
