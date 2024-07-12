export interface ProductEntity {
  sku: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  photoUrl?: string;
  ean?: string;
  subcategoryIds?: string[];
}
