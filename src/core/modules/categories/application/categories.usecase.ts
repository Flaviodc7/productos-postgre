import { NotFoundException } from '@nestjs/common';
import {
  CreateCategoriesPayload,
  ICategoriesUseCase,
  UpdateCategoriesPayload,
} from './categories.usecase.interface';
import { CategoryRepository } from '@categoriesDomain/categories.repository';
import { CategoryEntity } from '@categoriesDomain/entities/category.entity';
import { CategoryValue } from '@categoriesDomain/category.value';

export class CategoryUseCase implements ICategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(payload: CreateCategoriesPayload): Promise<CategoryEntity> {
    const categoryValue = new CategoryValue().create(payload);

    return await this.categoryRepository.create(categoryValue);
  }

  async findOneById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneById(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  async findByIds(ids: string[]): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findByIds(ids);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAll();
  }

  async update(payload: UpdateCategoriesPayload): Promise<CategoryEntity> {
    const { id } = payload;

    const outdatedCategory = await this.findOneById(id);

    if (!outdatedCategory) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return await this.categoryRepository.update(payload, outdatedCategory);
  }

  async delete(id: string) {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return result;
  }
}
