import { InventoryEntity } from './inventory.entity';

export interface InventoryProductsEntity {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  inventory: InventoryEntity;
}
