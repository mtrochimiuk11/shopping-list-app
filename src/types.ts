export interface Product {
  id: string,
  name: string,
  isBought?: boolean
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}