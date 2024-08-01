import { NotFoundException } from '@nestjs/common';
import {
  CreateInventoryPayload,
  IInventoryUseCase,
  UpdateInventoryPayload,
} from './inventory.usecase.interface';
import { InventoryRepository } from '@inventoryDomain/inventory.repository';
import { InventoryValue } from '@inventoryDomain/Inventory.value';
import { InventoryModel } from '@models/inventory/inventory.model';
import { ProductUseCase } from '@productApplication/product.usecase';

export class InventoryUseCase implements IInventoryUseCase {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly productUsecase: ProductUseCase,
  ) {}

  async create(payload: CreateInventoryPayload): Promise<InventoryModel> {
    const inventoryValue = new InventoryValue().create(payload);

    return await this.inventoryRepository.create(inventoryValue);
  }

  async findOneById(id: string): Promise<InventoryModel> {
    const inventory = await this.inventoryRepository.findOneById(id);

    if (!inventory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    return inventory;
  }

  async findByIds(ids: string[]): Promise<InventoryModel[]> {
    return await this.inventoryRepository.findByIds(ids);
  }

  async findAll(): Promise<InventoryModel[]> {
    return await this.inventoryRepository.findAll();
  }

  async update(payload: UpdateInventoryPayload): Promise<InventoryModel> {
    const { id, inventoryProducts } = payload;

    const inventory = await this.findOneById(id);

    if (!inventory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    if (inventory.currentStatus === 'APPROVED') {
      await this.productUsecase.updateStockInventory(inventoryProducts);
    }

    const inventoryValue = new InventoryValue().update(inventory, payload);

    return await this.inventoryRepository.update(inventory, inventoryValue);
  }

  async delete(id: string) {
    return await this.inventoryRepository.delete(id);
  }
}