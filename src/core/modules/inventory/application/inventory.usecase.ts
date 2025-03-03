import logger from '@src/logger';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import {
  CreateInventoryPayload,
  IInventoryUseCase,
  UpdateInventoryPayload,
} from './inventory.usecase.interface';
import { InventoryEntity } from '@inventoryDomain/entities/inventory.entity';
import { InventoryRepository } from '@inventoryDomain/inventory.repository';
import { InventoryValue } from '@inventoryDomain/Inventory.value';
import { ProductUseCase } from '@productApplication/product.usecase';

export class InventoryUseCase implements IInventoryUseCase {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,
    @Inject(forwardRef(() => ProductUseCase))
    private readonly productUsecase: ProductUseCase,
  ) {}

  async create(payload: CreateInventoryPayload): Promise<InventoryEntity> {
    const inventoryValue = new InventoryValue().create(payload);

    return await this.inventoryRepository.create(inventoryValue);
  }

  async findOneById(id: string): Promise<InventoryEntity> {
    const inventory = await this.inventoryRepository.findOneById(id);

    if (!inventory) {
      logger.log('error', `GET /inventories/:inventoryId: Inventory #${id} not found`);
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    return inventory;
  }

  async findByIds(ids: string[]): Promise<InventoryEntity[]> {
    return await this.inventoryRepository.findByIds(ids);
  }

  async findAll(): Promise<InventoryEntity[]> {
    return await this.inventoryRepository.findAll();
  }

  async update(payload: UpdateInventoryPayload): Promise<InventoryEntity> {
    const { id, inventoryProducts } = payload;

    const inventory = await this.findOneById(id);

    if (!inventory) {
      logger.log('error', `PUT /inventories/: Inventory #${id} not found`);
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    if (inventory.currentStatus === 'APPROVED') {
      await this.productUsecase.updateStockInventory(inventoryProducts);
    }

    const inventoryValue = new InventoryValue().update(inventory, payload);

    return await this.inventoryRepository.update(inventory, inventoryValue);
  }

  async delete(id: string) {
    const result = await this.inventoryRepository.delete(id);

    if (result.affected === 0) {
      logger.log('error', `DELETE /inventories/:inventoryId: Inventory #${id} not found`);
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    return result;
  }
}
