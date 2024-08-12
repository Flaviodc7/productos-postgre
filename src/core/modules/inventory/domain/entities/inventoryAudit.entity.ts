export interface InventoryAuditStatusEntity {
    id: string;
    newStatus: string;
    previousStatus?: string;
    responsible: string;
    updateDate: string;
  }