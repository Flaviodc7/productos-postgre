import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubcategoryEntity } from '@subcategoriesDomain/entities/subcategory.entity';
import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { SubcategoryModel } from '@models/subcategories.model';

@Injectable()
export class SubcategoryPostgreRepository implements SubcategoryRepository {
  constructor(
    @InjectRepository(SubcategoryModel)
    private subcategoryRepository: Repository<SubcategoryModel>,
  ) {}

  async findAll(): Promise<SubcategoryModel[]> {
    return await this.subcategoryRepository.find();
  }

  async findOneById(id: string): Promise<SubcategoryModel> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: id },
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }

    return subcategory;
  }

  async findByIds(ids: string[]): Promise<SubcategoryModel[]> {
    return await this.subcategoryRepository.findBy({ id: In(ids) });
  }

  async create(payload: SubcategoryEntity): Promise<SubcategoryModel> {
    const newSubcategory = this.subcategoryRepository.create(payload);

    return await this.subcategoryRepository.save(newSubcategory);
  }

  async update(
    updatedSubcategory: SubcategoryModel,
    payload: SubcategoryEntity,
  ): Promise<SubcategoryModel> {
    this.subcategoryRepository.merge(updatedSubcategory, payload);

    return await this.subcategoryRepository.save(updatedSubcategory);
  }

  async delete(id: string): Promise<any> {
    return await this.subcategoryRepository.delete(id);
  }
}
