export type SizeValue = "junior" | "senior" | "mega";
export type DoughValue = "classic" | "pan" | "cheesy";

export type CartItem = {
  cartId: string;
  id: string;
  name: string;
  category: string;
  size?: SizeValue;
  dough?: DoughValue;
  extras: string[];
  quantity: number;
  unitPrice: number;
};
