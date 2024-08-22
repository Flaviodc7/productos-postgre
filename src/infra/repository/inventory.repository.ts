import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InventoryEntity } from '@inventoryDomain/entities/inventory.entity';
import { InventoryRepository } from '@inventoryDomain/inventory.repository';
import { InventoryModel } from '@models/inventory/inventory.model';

@Injectable()
export class InventoryPostgreRepository implements InventoryRepository {
  constructor(
    @InjectRepository(InventoryModel)
    private inventoryRepository: Repository<InventoryModel>,
  ) {}

  async findAll(): Promise<InventoryEntity[]> {
    return await this.inventoryRepository.find();
  }

  async findOneById(id: string): Promise<InventoryEntity> {
    return await this.inventoryRepository.findOne({ where: { id: id } });
  }

  async findByIds(ids: string[]): Promise<InventoryEntity[]> {
    return await this.inventoryRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(payload: InventoryEntity): Promise<InventoryEntity> {
    const newInventory = this.inventoryRepository.create(payload);

    return await this.inventoryRepository.save(newInventory);
  }

  async update(
    inventory: InventoryEntity,
    payload: InventoryEntity,
  ): Promise<InventoryEntity> {
    this.inventoryRepository.merge(inventory, payload);
    return await this.inventoryRepository.save(inventory);
  }

  async delete(id: string): Promise<any> {
    return await this.inventoryRepository.delete(id);
  }
}
