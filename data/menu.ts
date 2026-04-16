import type { SizeValue } from "@/types/cart";

export type MenuCategory =
  | "Offres"
  | "Menus"
  | "Hot Bread"
  | "Pizzas Originales"
  | "Pizzas Sauce Lovers"
  | "Pizzas French Touch"
  | "Appetizers"
  | "Box"
  | "Paninis"
  | "Salades"
  | "Boissons"
  | "Desserts";

export type SourceValue = "confirmed-joigny" | "confirmed-dreams-network" | "inferred-demo";

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  prices: Partial<Record<SizeValue, number>>;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  tags?: string[];
  source: SourceValue;
};

export const shop = {
  name: "Dream's Pizza Joigny",
  city: "Joigny",
  phoneDisplay: "03 86 91 84 59",
  phoneHref: "tel:+33386918459",
  address: "1 Avenue Roger Varrey, 89300 Joigny",
  pickupLeadMin: 20,
  pickupLeadMax: 35,
  openingNote: "Commande à retirer sur place",
  heroOffer: "1 pizza Senior achetée = 1 offerte • 1 pizza Mega achetée = 1 offerte",
  heroOfferNote: "Offres de retrait visibles publiquement dans l'écosystème Dreams Pizza. Validation finale à faire par la pizzeria avant mise en production.",
  hours: [
    "Dimanche : 11:00–14:00 / 18:00–22:30",
    "Lundi à jeudi : 11:00–14:00 / 18:00–22:00",
    "Vendredi : 18:00–22:30",
    "Samedi : 11:00–14:00 / 18:00–22:30"
  ]
};

export const pizzaSizes: { value: SizeValue; label: string; diameter: string; multiplierHint: string }[] = [
  { value: "junior", label: "Junior", diameter: "26 cm", multiplierHint: "solo" },
  { value: "senior", label: "Senior", diameter: "31 cm", multiplierHint: "classique" },
  { value: "mega", label: "Mega", diameter: "40 cm", multiplierHint: "partage" }
];

export const pizzaDoughs = [
  { value: "classic", label: "Classic" },
  { value: "pan", label: "Pan" },
  { value: "cheesy", label: "Cheesy" }
] as const;

export const extras = [
  { label: "Extra fromage", price: 1.5 },
  { label: "Cheddar", price: 1.5 },
  { label: "Jalapeños", price: 1.2 },
  { label: "Olives", price: 1 },
  { label: "Sauce burger", price: 1 },
  { label: "Boursin", price: 1.5 }
];

export const categories: MenuCategory[] = [
  "Offres",
  "Menus",
  "Hot Bread",
  "Pizzas Originales",
  "Pizzas Sauce Lovers",
  "Pizzas French Touch",
  "Appetizers",
  "Box",
  "Paninis",
  "Salades",
  "Boissons",
  "Desserts"
];

const j = "confirmed-joigny" as const;
const n = "confirmed-dreams-network" as const;
const i = "inferred-demo" as const;

export const menu: MenuItem[] = [
  {
    id: "offre-senior-1plus1",
    category: "Offres",
    name: "1 Senior achetée = 1 offerte",
    description: "Offre retrait mise en avant pour une commande facile à emporter.",
    prices: { senior: 17.9 },
    popular: true,
    tags: ["Retrait", "Senior", "Offre"],
    source: n
  },
  {
    id: "offre-mega-1plus1",
    category: "Offres",
    name: "1 Mega achetée = 1 offerte",
    description: "Offre retrait très visible sur l'univers Dreams Pizza.",
    prices: { mega: 23.8 },
    popular: true,
    tags: ["Retrait", "Mega", "Offre"],
    source: n
  },
  {
    id: "menu-solo",
    category: "Menus",
    name: "Menu Solo",
    description: "1 pizza junior, 1 cookie et 1 Pepsi 33 cl.",
    prices: { junior: 13.4 },
    popular: true,
    source: j
  },
  {
    id: "menu-double",
    category: "Menus",
    name: "Menu Double",
    description: "2 pizzas senior, 1 cookie et 1 Pepsi 1,5 L.",
    prices: { senior: 30.4 },
    source: j
  },
  {
    id: "menu-triple",
    category: "Menus",
    name: "Menu Triple",
    description: "3 pizzas senior, 1 cookie et 1 Pepsi 1,5 L.",
    prices: { senior: 36.4 },
    source: j
  },
  {
    id: "hot-bread-compose",
    category: "Hot Bread",
    name: "Hot Bread à composer",
    description: "1 base, 1 viande, 1 légume et 1 fromage au choix.",
    prices: { junior: 7.4 },
    popular: true,
    source: j
  },
  {
    id: "marguerita",
    category: "Pizzas Originales",
    name: "Marguerita",
    description: "Sauce tomate, mozzarella, olives et origan.",
    prices: { junior: 9.9, senior: 13.9, mega: 19.9 },
    source: n
  },
  {
    id: "queen",
    category: "Pizzas Originales",
    name: "Queen",
    description: "Sauce tomate, mozzarella, jambon de dinde, champignons et origan.",
    prices: { junior: 10.4, senior: 14.4, mega: 20.4 },
    source: n
  },
  {
    id: "veggie",
    category: "Pizzas Originales",
    name: "Veggie",
    description: "Sauce tomate, mozzarella, champignons, poivrons, olives, oignons et origan.",
    prices: { junior: 10.4, senior: 14.4, mega: 20.4 },
    vegetarian: true,
    source: n
  },
  {
    id: "calzone",
    category: "Pizzas Originales",
    name: "Calzone",
    description: "Sauce tomate, mozzarella, jambon de dinde, œuf et origan.",
    prices: { junior: 10.4, senior: 14.4, mega: 20.4 },
    source: n
  },
  {
    id: "fermiere",
    category: "Pizzas Originales",
    name: "Fermière",
    description: "Sauce tomate, mozzarella, poulet rôti, fondue d'oignons, pommes de terre persillées et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    popular: true,
    source: j
  },
  {
    id: "tonna",
    category: "Pizzas Originales",
    name: "Tonna",
    description: "Sauce tomate, mozzarella, olives, thon, œuf et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    source: j
  },
  {
    id: "campione",
    category: "Pizzas Originales",
    name: "Campione",
    description: "Sauce tomate, mozzarella, champignons de Paris, œuf, bœuf haché et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    source: j
  },
  {
    id: "pepperizo",
    category: "Pizzas Originales",
    name: "Pepperizo",
    description: "Sauce tomate, mozzarella, pepperoni, chorizo, fondue d'oignons, olives et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    source: j
  },
  {
    id: "orientale",
    category: "Pizzas Originales",
    name: "Orientale",
    description: "Sauce tomate, mozzarella, merguez, champignons de Paris, œuf et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    popular: true,
    source: j
  },
  {
    id: "bresilienne",
    category: "Pizzas Originales",
    name: "Brésilienne",
    description: "Sauce tomate, mozzarella, bœuf haché, merguez, olives, poivrons et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    source: j
  },
  {
    id: "chicken",
    category: "Pizzas Originales",
    name: "Chicken",
    description: "Crème fraîche, mozzarella, poulet fumé, pommes de terre persillées et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    popular: true,
    source: j
  },
  {
    id: "hawaienne",
    category: "Pizzas Originales",
    name: "Hawaïenne",
    description: "Crème fraîche, mozzarella, poulet fumé, ananas et origan.",
    prices: { junior: 10.9, senior: 14.9, mega: 20.9 },
    source: j
  },
  {
    id: "boursin",
    category: "Pizzas Sauce Lovers",
    name: "Boursin",
    description: "Crème fraîche, mozzarella, poulet fumé, pommes de terre persillées, Boursin et origan.",
    prices: { junior: 11.4, senior: 15.4, mega: 21.9 },
    source: j
  },
  {
    id: "bbq",
    category: "Pizzas Sauce Lovers",
    name: "BBQ",
    description: "Sauce BBQ, mozzarella, bœuf haché, poivrons grillés, fondue d'oignons et origan.",
    prices: { junior: 11.4, senior: 15.4, mega: 21.9 },
    source: j
  },
  {
    id: "spicy",
    category: "Pizzas Sauce Lovers",
    name: "Spicy",
    description: "Sauce thaï, mozzarella, poulet rôti, poivrons grillés, piment, jalapeños et origan.",
    prices: { junior: 11.4, senior: 15.4, mega: 21.9 },
    spicy: true,
    source: j
  },
  {
    id: "samourai",
    category: "Pizzas Sauce Lovers",
    name: "Samouraï",
    description: "Sauce samouraï, mozzarella, bœuf haché, poulet rôti, fondue d'oignons, pommes de terre persillées et origan.",
    prices: { junior: 11.4, senior: 15.4, mega: 21.9 },
    popular: true,
    source: j
  },
  {
    id: "burger",
    category: "Pizzas Sauce Lovers",
    name: "Burger",
    description: "Sauce ketchup, mozzarella, bœuf haché, fondue d'oignons, cheddar, cornichons, tomates et origan.",
    prices: { junior: 11.4, senior: 15.4, mega: 21.9 },
    source: j
  },
  {
    id: "indienne",
    category: "Pizzas Sauce Lovers",
    name: "Indienne",
    description: "Sauce curry, mozzarella, poulet rôti, poivrons grillés, pommes de terre persillées et origan.",
    prices: { junior: 11.4, senior: 15.4, mega: 21.9 },
    source: j
  },
  {
    id: "tartisavoie",
    category: "Pizzas French Touch",
    name: "Tartisavoie",
    description: "Crème fraîche, mozzarella, lardons, reblochon, fondue d'oignons, pommes de terre persillées et origan.",
    prices: { junior: 11.9, senior: 15.9, mega: 22.9 },
    popular: true,
    source: j
  },
  {
    id: "quatre-fromages",
    category: "Pizzas French Touch",
    name: "4 Fromages",
    description: "Sauce tomate, mozzarella, chèvre, gorgonzola, raclette, roquette et origan.",
    prices: { junior: 11.9, senior: 15.9, mega: 22.9 },
    vegetarian: true,
    popular: true,
    source: j
  },
  {
    id: "wings",
    category: "Appetizers",
    name: "Chicken Wings",
    description: "Portion de wings à partager.",
    prices: { junior: 4.5 },
    source: n
  },
  {
    id: "tenders",
    category: "Appetizers",
    name: "Chicken Tenders",
    description: "Bouchées panées, croustillantes.",
    prices: { junior: 5.9 },
    source: n
  },
  {
    id: "dreams-box",
    category: "Box",
    name: "Dream's Box",
    description: "Assortiment de bouchées à partager.",
    prices: { junior: 11.5 },
    popular: true,
    source: n
  },
  {
    id: "panini-chevre",
    category: "Paninis",
    name: "Panini Chèvre",
    description: "Panini chaud au chèvre et mozzarella.",
    prices: { junior: 6.9 },
    source: n
  },
  {
    id: "panini-poulet",
    category: "Paninis",
    name: "Panini Poulet",
    description: "Panini chaud, base crème, mozzarella, poulet fumé.",
    prices: { junior: 6.9 },
    source: i
  },
  {
    id: "salade-fromagere",
    category: "Salades",
    name: "Fromagère",
    description: "Salade, tomates et assortiment de fromages.",
    prices: { junior: 8.4 },
    vegetarian: true,
    source: n
  },
  {
    id: "pepsi-33",
    category: "Boissons",
    name: "Pepsi 33 cl",
    description: "Boisson fraîche.",
    prices: { junior: 2.5 },
    source: i
  },
  {
    id: "pepsi-15",
    category: "Boissons",
    name: "Pepsi 1,5 L",
    description: "Grand format.",
    prices: { junior: 4.5 },
    source: i
  },
  {
    id: "7up-33",
    category: "Boissons",
    name: "7UP 33 cl",
    description: "Boisson fraîche.",
    prices: { junior: 2.5 },
    source: i
  },
  {
    id: "cookie",
    category: "Desserts",
    name: "Cookie",
    description: "Cookie individuel.",
    prices: { junior: 2.5 },
    source: n
  },
  {
    id: "pizza-nutella",
    category: "Desserts",
    name: "Pizza Nutella",
    description: "Dessert gourmand à partager.",
    prices: { junior: 8, senior: 11, mega: 15 },
    source: n
  }
];

export function getPrice(item: MenuItem, size?: SizeValue) {
  if (!size) {
    return item.prices.junior ?? item.prices.senior ?? item.prices.mega ?? 0;
  }
  return item.prices[size] ?? item.prices.junior ?? item.prices.senior ?? item.prices.mega ?? 0;
}

export const featuredPizzaIds = ["fermiere", "orientale", "chicken", "samourai", "tartisavoie", "quatre-fromages"];
