import { InventoryEntity } from './entities/inventory.entity';

export interface InventoryRepository {
  create: (data: InventoryEntity) => Promise<InventoryEntity>;
  findOneById(id: string): Promise<InventoryEntity>;
  findByIds(ids: string[]): Promise<InventoryEntity[]>;
  findAll(): Promise<InventoryEntity[]>;
  update(
    category: InventoryEntity,
    data: InventoryEntity,
  ): Promise<InventoryEntity>;
  delete(id: string): Promise<any>;
}
