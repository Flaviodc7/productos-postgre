import {
  CreateSubcategoriesPayload,
  ISubcategoriesUseCase,
  UpdateSubcategoriesPayload,
} from './subcategories.usecase.interface';
import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { SubcategoryValue } from '@subcategoriesDomain/subcategory.value';
import { SubcategoryEntity } from '../domain/entities/subcategory.entity';

export class SubcategoryUseCase implements ISubcategoriesUseCase {
  constructor(private readonly subcategoryRepository: SubcategoryRepository) {}

  async create(
    payload: CreateSubcategoriesPayload,
  ): Promise<SubcategoryEntity> {
    const categoryValue = new SubcategoryValue().create(payload);

    return await this.subcategoryRepository.create(categoryValue);
  }

  async findOneById(id: string): Promise<SubcategoryEntity> {
    return await this.subcategoryRepository.findOneById(id);
  }

  async findByIds(ids: string[]): Promise<SubcategoryEntity[]> {
    return await this.subcategoryRepository.findByIds(ids);
  }

  async findAll(): Promise<SubcategoryEntity[]> {
    return await this.subcategoryRepository.findAll();
  }

  async update(
    payload: UpdateSubcategoriesPayload,
  ): Promise<SubcategoryEntity> {
    return await this.subcategoryRepository.update(payload);
  }

  async delete(id: string): Promise<any> {
    return await this.subcategoryRepository.delete(id);
  }
}
