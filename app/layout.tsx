import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";
import { CartProvider } from "@/components/providers/cart-provider";

export const metadata: Metadata = {
  title: "Dream's Pizza Joigny — V5 retrait",
  description: "Démo V5 de commande de pizzas à retirer à la pizzeria à Joigny."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <FloatingActions />
        </CartProvider>
      </body>
    </html>
  );
}
