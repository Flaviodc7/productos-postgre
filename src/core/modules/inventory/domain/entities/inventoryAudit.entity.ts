import { InventoryEntity } from './inventory.entity';

export interface InventoryAuditEntity {
  id: string;
  newStatus: string;
  previousStatus?: string;
  responsible: string;
  updateDate: string;
  inventory: InventoryEntity;
}
