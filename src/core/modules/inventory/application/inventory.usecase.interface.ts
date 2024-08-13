import {
  InventoryProducts,
  InventoryEntity,
  InventoryStatus,
} from '@inventoryDomain/entities/inventory.entity';

export interface IInventoryUseCase {
  create: (payload: CreateInventoryPayload) => Promise<InventoryEntity>;
  findOneById(id: string): Promise<InventoryEntity>;
  findByIds(ids: string[]): Promise<InventoryEntity[]>;
  findAll(): Promise<InventoryEntity[]>;
  update(payload: UpdateInventoryPayload): Promise<InventoryEntity>;
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
