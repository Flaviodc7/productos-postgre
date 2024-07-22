import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InventoryRepository } from '@inventoryDomain/inventory.repository';
import { InventoryEntity } from '@inventoryDomain/entities/inventory.entity';
import { InventoryModel } from '@models/inventory.model';

@Injectable()
export class InventoryPostgreRepository implements InventoryRepository {
  constructor(
    @InjectRepository(InventoryModel)
    private inventoryRepository: Repository<InventoryModel>,
  ) {}

  async findAll(): Promise<InventoryModel[]> {
    return await this.inventoryRepository.find({
      relations: ['subcategories'],
    });
  }

  async findOneById(id: string): Promise<InventoryModel> {
    return await this.inventoryRepository.findOne({ where: { id: id } });
  }

  async findByIds(ids: string[]): Promise<InventoryModel[]> {
    return await this.inventoryRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(payload: InventoryEntity): Promise<InventoryModel> {
    const newInventory = this.inventoryRepository.create(payload);

    return await this.inventoryRepository.save(newInventory);
  }

  async update(
    inventory: InventoryModel,
    payload: InventoryEntity,
  ): Promise<InventoryModel> {
    this.inventoryRepository.merge(inventory, payload);
    return await this.inventoryRepository.save(inventory);
  }

  async delete(id: string): Promise<any> {
    return await this.inventoryRepository.delete(id);
  }
}
