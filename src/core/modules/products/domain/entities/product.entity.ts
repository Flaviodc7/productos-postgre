export interface ProductEntity {
  sku: string;
  name: string;
  photoUrl: string;
  price: number;
  stock: number;
  ean?: string;
  description?: string;
  subcategoryIds?: string[];
}
