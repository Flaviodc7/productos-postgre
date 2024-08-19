import { InventoryEntity, InventoryStatus } from './inventory.entity';

export interface InventoryAuditEntity {
  id: string;
  newStatus: InventoryStatus;
  previousStatus?: InventoryStatus;
  responsible: string;
  updateDate: string;
  inventory: InventoryEntity;
}
