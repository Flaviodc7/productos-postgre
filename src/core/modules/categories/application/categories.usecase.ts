import { NotFoundException } from '@nestjs/common';
import {
  CreateCategoriesPayload,
  ICategoriesUseCase,
  UpdateCategoriesPayload,
} from './categories.usecase.interface';
import { CategoryRepository } from '@categoriesDomain/categories.repository';
import { CategoryValue } from '@categoriesDomain/category.value';
import { CategoryModel } from '@models/categories.model';

export class CategoryUseCase implements ICategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(payload: CreateCategoriesPayload): Promise<CategoryModel> {
    const categoryValue = new CategoryValue().create(payload);

    return await this.categoryRepository.create(categoryValue);
  }

  async findOneById(id: string): Promise<CategoryModel> {
    const category = await this.categoryRepository.findOneById(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  async findByIds(ids: string[]): Promise<CategoryModel[]> {
    return await this.categoryRepository.findByIds(ids);
  }

  async findAll(): Promise<CategoryModel[]> {
    return await this.categoryRepository.findAll();
  }

  async update(payload: UpdateCategoriesPayload): Promise<CategoryModel> {
    const { id } = payload;

    const category = (await this.findOneById(id)) as CategoryModel;

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return await this.categoryRepository.update(category, payload);
  }

  async delete(id: string) {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return result;
  }
}
