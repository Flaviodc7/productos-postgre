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

    return {
      auditStatus: [
        {
          newStatus: createdStatus,
          responsible: 'Admin', // TODO: responsible extracted from authentication user
          updateDate: new Date().toISOString(),
        },
      ],
      id: uuid(),
      currentStatus: createdStatus,
      createdAt: new Date().toISOString(),
      ...inventoryPayload,
    };
  };

  public update = (
    inventoryPayload: UpdateInventoryPayload,
  ): InventoryEntity => {
    const lastItemAuditStatus = inventoryPayload.auditStatus.length - 1;

    const updatedAuditStatus = [
      ...inventoryPayload.auditStatus,
      {
        newStatus: inventoryPayload.currentStatus,
        previousStatus:
          inventoryPayload.auditStatus[lastItemAuditStatus].newStatus,
        responsible: 'Admin', // TODO: responsible extracted from authentication user
        updateDate: new Date().toISOString(),
      },
    ];

    return {
      ...inventoryPayload,
      auditStatus: updatedAuditStatus,
    };
  };
}
