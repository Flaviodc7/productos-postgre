import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubcategoryEntity } from '@subcategoriesDomain/entities/subcategory.entity';
import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { CategoryPostgreRepository } from '@repository/categories.repository';
import { SubcategoryModel } from '@models/subcategories.model';

@Injectable()
export class SubcategoryPostgreRepository implements SubcategoryRepository {
  constructor(
    @InjectRepository(SubcategoryModel)
    private subcategoryRepository: Repository<SubcategoryModel>,
    private categoryRepository: CategoryPostgreRepository,
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

  async update(payload: SubcategoryEntity): Promise<SubcategoryModel> {
    const { id } = payload;

    const subcategory: any = await this.findOneById(id);

    if (!subcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }

    if (payload.categoryId) {
      const category = await this.categoryRepository.findOneById(
        payload.categoryId,
      );
      subcategory.category = category;
    }

    this.subcategoryRepository.merge(subcategory, payload);
    return await this.subcategoryRepository.save(subcategory);
  }

  async delete(id: string): Promise<any> {
    return await this.subcategoryRepository.delete(id);
  }
}
