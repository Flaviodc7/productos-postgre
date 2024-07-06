import { CategoryRepository } from '@categoriesDomain/categories.repository';
import { CategoryValue } from '@categoriesDomain/category.value';
import { ICategoriesUseCase } from './categories.usecase.interface';
import { CategoryEntity } from '@categoriesDomain/entities/category.entity';

export class CategoryUseCase implements ICategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: any): Promise<CategoryEntity> {
    const categoryValue = new CategoryValue().create(data);

    return await this.categoryRepository.create(categoryValue);
  }

  async findOneById(id: string): Promise<CategoryEntity> {
    return await this.categoryRepository.findOneById(id);
  }

  async findByIds(ids: string[]): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findByIds(ids);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAll();
  }

  async update(payload: any): Promise<CategoryEntity> {
    return await this.categoryRepository.update(payload);
  }

  async delete(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
