import { v4 as uuid } from 'uuid';
import { CreateInventoryPayload } from '@inventoryApplication/inventory.usecase.interface';
import { InventoryEntity } from './entities/inventory.entity';

export class InventoryValue {
  public create = (
    inventoryPayload: CreateInventoryPayload,
  ): InventoryEntity => {
    return {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...inventoryPayload,
    };
  };
}
