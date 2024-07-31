import {
  InventoryProducts,
  InventoryStatus,
} from '@inventoryDomain/entities/inventory.entity';
import { InventoryModel } from '@models/inventory/inventory.model';

export interface IInventoryUseCase {
  create: (payload: CreateInventoryPayload) => Promise<InventoryModel>;
  findOneById(id: string): Promise<InventoryModel>;
  findByIds(ids: string[]): Promise<InventoryModel[]>;
  findAll(): Promise<InventoryModel[]>;
  update(payload: UpdateInventoryPayload): Promise<InventoryModel>;
  delete(id: string): Promise<any>;
}

export interface CreateInventoryPayload {
  inventoryProducts: InventoryProducts[];
}

export interface UpdateInventoryPayload extends CreateInventoryPayload {
  id: string;
  createdAt: string;
  currentStatus: InventoryStatus;
}
