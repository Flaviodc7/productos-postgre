export interface InventoryEntity {
  id: string;
  createdAt: string;
  inventoryProducts: InventoryProducts[];
  status: InventoryStatus;
}

export interface InventoryProducts {
  sku: string;
  name: string;
  quantity: number;
}

export type InventoryStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED';