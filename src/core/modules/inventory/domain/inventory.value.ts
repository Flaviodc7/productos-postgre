import { v4 as uuid } from 'uuid';
import {
  CreateInventoryPayload,
  UpdateInventoryPayload,
} from '@inventoryApplication/inventory.usecase.interface';
import { InventoryEntity } from './entities/inventory.entity';

export class InventoryValue {
  public create = (
    inventoryPayload: CreateInventoryPayload,
  ): InventoryEntity => {
    const createdStatus = 'PENDING';

    const inventory = {
      id: uuid(),
      currentStatus: createdStatus,
      createdAt: new Date().toISOString(),
      ...inventoryPayload,
    } as InventoryEntity;

    return {
      inventoryAudit: [
        {
          id: uuid(),
          inventory,
          newStatus: createdStatus,
          responsible: 'Admin', // TODO: responsible extracted from authentication user
          updateDate: new Date().toISOString(),
        },
      ],
      ...inventory,
    };
  };

  public update = (
    inventory: InventoryEntity,
    inventoryPayload: UpdateInventoryPayload,
  ): InventoryEntity => {
    const lastItemAuditStatus = inventory.inventoryAudit.length - 1;

    const newAuditStatus = {
      id: uuid(),
      inventory: inventory,
      newStatus: inventoryPayload.currentStatus,
      previousStatus: inventory.inventoryAudit[lastItemAuditStatus].newStatus,
      responsible: 'Admin', // TODO: responsible extracted from authentication user
      updateDate: new Date().toISOString(),
    };

    const updatedAuditStatus = [...inventory.inventoryAudit, newAuditStatus];

    return {
      ...inventory,
      inventoryAudit: updatedAuditStatus,
    };
  };
}
