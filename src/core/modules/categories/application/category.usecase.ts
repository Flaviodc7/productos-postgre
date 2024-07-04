import { CategoryRepository } from '@categoryDomain/category.repository';
import { CategoryValue } from '@categoryDomain/category.value';
import { ICategoryUseCase } from './category.usecase.interface';

export class CategoryUseCase implements ICategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: any): Promise<any> {
    const categoryValue = new CategoryValue().create(data);

    return await this.categoryRepository.create(categoryValue);
  }

  async findOneById(id: string): Promise<any> {
    return await this.categoryRepository.findOneById(id);
  }

  async findByIds(ids: string[]): Promise<any> {
    return await this.categoryRepository.findByIds(ids);
  }

  async findAll(): Promise<any[]> {
    return await this.categoryRepository.findAll();
  }

  async update(id: string, data: any): Promise<any> {
    return await this.categoryRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
