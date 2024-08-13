import { InventoryAuditEntity } from './inventoryAudit.entity';
import { InventoryProductsEntity } from './inventoryProducts.entity';

export interface InventoryEntity {
  id: string;
  createdAt: string;
  inventoryAudit: InventoryAuditEntity[];
  inventoryProducts: InventoryProductsEntity[];
  currentStatus: InventoryStatus;
}

export type InventoryStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
