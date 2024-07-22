import { NotFoundException } from '@nestjs/common';
import {
  CreateInventoryPayload,
  IInventoryUseCase,
  UpdateInventoryPayload,
} from './inventory.usecase.interface';
import { InventoryRepository } from '@inventoryDomain/inventory.repository';
import { InventoryValue } from '@inventoryDomain/Inventory.value';
import { InventoryModel } from '@models/inventory.model';

export class InventoryUseCase implements IInventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async create(data: CreateInventoryPayload): Promise<InventoryModel> {
    const inventoryValue = new InventoryValue().create(data);

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
    const { id } = payload;

    const inventory = (await this.findOneById(id)) as InventoryModel;

    if (!inventory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    return await this.inventoryRepository.update(inventory, payload);
  }

  async delete(id: string) {
    return await this.inventoryRepository.delete(id);
  }
}
