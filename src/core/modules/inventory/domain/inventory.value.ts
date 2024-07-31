import { v4 as uuid } from 'uuid';
import {
  CreateInventoryPayload,
  UpdateInventoryPayload,
} from '@inventoryApplication/inventory.usecase.interface';
import { InventoryEntity } from './entities/inventory.entity';
import { InventoryModel } from '@models/inventory/inventory.model';

export class InventoryValue {
  public create = (
    inventoryPayload: CreateInventoryPayload,
  ): InventoryEntity => {
    const createdStatus = 'PENDING';

    return {
      auditStatus: [
        {
          id: uuid(),
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
    inventoryModel: InventoryModel,
    inventoryPayload: UpdateInventoryPayload,
  ): InventoryEntity => {
    const lastItemAuditStatus = inventoryModel.auditStatus.length - 1;

    const newAuditStatus = {
      id: uuid(),
      newStatus: inventoryPayload.currentStatus,
      previousStatus: inventoryModel.auditStatus[lastItemAuditStatus].newStatus,
      responsible: 'Admin', // TODO: responsible extracted from authentication user
      updateDate: new Date().toISOString(),
    };

    const updatedAuditStatus = [...inventoryModel.auditStatus, newAuditStatus];

    return {
      ...inventoryPayload,
      auditStatus: updatedAuditStatus,
    };
  };
}
