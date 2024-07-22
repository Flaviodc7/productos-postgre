import { InventoryModel } from '@models/inventory.model';

export interface IInventoryUseCase {
  create: (payload: CreateInventoryPayload) => Promise<InventoryModel>;
  findOneById(id: string): Promise<InventoryModel>;
  findByIds(ids: string[]): Promise<InventoryModel[]>;
  findAll(): Promise<InventoryModel[]>;
  update(payload: UpdateInventoryPayload): Promise<InventoryModel>;
  delete(id: string): Promise<any>;
}

export interface CreateInventoryPayload {
  name: string;
  description: string;
}

export interface UpdateInventoryPayload extends CreateInventoryPayload {
  id: string;
  createdAt: string;
}
