export interface IProduct {
  id: string;
  _id?: string;
  name: string;
  price: number;
  inStock: number;
  image?: string;
  description?: string;
  categoryId?: { _id: string; name: string } | string;
}
