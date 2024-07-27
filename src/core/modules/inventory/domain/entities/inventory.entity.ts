export interface InventoryEntity {
  id: string;
  createdAt: string;
  auditStatus: AuditStatus[];
  inventoryProducts: InventoryProducts[];
  currentStatus: InventoryStatus;
}

export interface AuditStatus {
  newStatus: string;
  previousStatus?: string;
  responsible: string;
  updateDate: string;
}

export interface InventoryProducts {
  sku: string;
  name: string;
  quantity: number;
}

export type InventoryStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
