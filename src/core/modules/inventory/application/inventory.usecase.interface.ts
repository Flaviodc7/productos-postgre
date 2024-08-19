import { InventoryEntity, InventoryStatus } from '@inventoryDomain/entities/inventory.entity';
import { InventoryProductsEntity } from '@inventoryDomain/entities/inventoryProducts.entity';

export interface IInventoryUseCase {
  create: (payload: CreateInventoryPayload) => Promise<InventoryEntity>;
  findOneById(id: string): Promise<InventoryEntity>;
  findByIds(ids: string[]): Promise<InventoryEntity[]>;
  findAll(): Promise<InventoryEntity[]>;
  update(payload: UpdateInventoryPayload): Promise<InventoryEntity>;
  delete(id: string): Promise<any>;
}

export interface CreateInventoryProductPayload {
  id: string;
  sku: string;
  name: string;
  quantity: number;
}

export interface CreateInventoryPayload {
  inventoryProducts: CreateInventoryProductPayload[];
}

export interface UpdateInventoryPayload extends CreateInventoryPayload {
  id: string;
  createdAt: string;
  currentStatus: InventoryStatus;
}
