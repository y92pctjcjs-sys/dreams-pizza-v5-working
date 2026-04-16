import { Hero } from "@/components/hero";
import { OffersStrip } from "@/components/offers-strip";
import { FeaturedPizzas } from "@/components/featured-pizzas";
import { MenuSection } from "@/components/menu-section";
import { OrderSummary } from "@/components/order-summary";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <OffersStrip />
      <FeaturedPizzas />
      <section className="section">
        <div className="container layout-with-sidebar">
          <MenuSection />
          <div className="sticky-side">
            <OrderSummary compact />
          </div>
        </div>
      </section>
    </main>
  );
}
