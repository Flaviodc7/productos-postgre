import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { SubcategoryValue } from '@subcategoriesDomain/subcategory.value';
import { ISubcategoriesUseCase } from './subcategories.usecase.interface';

export class SubcategoryUseCase implements ISubcategoriesUseCase {
  constructor(private readonly subcategoryRepository: SubcategoryRepository) {}

  async create(data: any): Promise<any> {
    const categoryValue = new SubcategoryValue().create(data);

    return await this.subcategoryRepository.create(categoryValue);
  }

  async findOneById(id: string): Promise<any> {
    return await this.subcategoryRepository.findOneById(id);
  }

  async findByIds(ids: string[]): Promise<any> {
    return await this.subcategoryRepository.findByIds(ids);
  }

  async findAll(): Promise<any[]> {
    return await this.subcategoryRepository.findAll();
  }

  async update(id: string, data: any): Promise<any> {
    return await this.subcategoryRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.subcategoryRepository.delete(id);
  }
}
