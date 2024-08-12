import { InventoryAuditStatusEntity } from "./inventoryAudit.entity";
import { InventoryProductsEntity } from "./inventoryProducts.entity";

export interface InventoryEntity {
  id: string;
  createdAt: string;
  auditStatus: InventoryAuditStatusEntity[];
  inventoryProducts: InventoryProductsEntity[];
  currentStatus: InventoryStatus;
}

export type InventoryStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
