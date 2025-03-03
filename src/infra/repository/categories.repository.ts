import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CategoryRepository } from '@categoriesDomain/categories.repository';
import { CategoryEntity } from '@categoriesDomain/entities/category.entity';
import { CategoryModel } from '@models/categories.model';

@Injectable()
export class CategoryPostgreRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOneById(id: string): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['subcategories'],
    });
  }

  async findByIds(ids: string[]): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      where: { id: In(ids) },
      relations: ['subcategories'],
    });
  }

  async create(payload: CategoryEntity): Promise<CategoryEntity> {
    const newCategory = this.categoryRepository.create(payload);

    return await this.categoryRepository.save(newCategory);
  }

  async update(
    category: CategoryEntity,
    outdatedCategory: CategoryEntity,
  ): Promise<CategoryEntity> {
    this.categoryRepository.merge(category, outdatedCategory);
    return await this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<any> {
    return await this.categoryRepository.delete(id);
  }
}
