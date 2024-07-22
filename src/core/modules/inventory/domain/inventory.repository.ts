import { InventoryEntity } from './entities/inventory.entity';
import { InventoryModel } from '@models/inventory.model';

export interface InventoryRepository {
  create: (data: InventoryEntity) => Promise<InventoryModel>;
  findOneById(id: string): Promise<InventoryModel>;
  findByIds(ids: string[]): Promise<InventoryModel[]>;
  findAll(): Promise<InventoryModel[]>;
  update(
    category: InventoryModel,
    data: InventoryEntity,
  ): Promise<InventoryModel>;
  delete(id: string): Promise<any>;
}
