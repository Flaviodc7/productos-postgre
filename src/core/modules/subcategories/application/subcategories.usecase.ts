import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import {
  CreateSubcategoriesPayload,
  ISubcategoriesUseCase,
  UpdateSubcategoriesPayload,
} from './subcategories.usecase.interface';
import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { CategoryUseCase } from '@categoriesApplication/categories.usecase';
import { SubcategoryValue } from '@subcategoriesDomain/subcategory.value';
import { SubcategoryEntity } from '../domain/entities/subcategory.entity';
import { ProductUseCase } from '@productApplication/product.usecase';

export class SubcategoryUseCase implements ISubcategoriesUseCase {
  constructor(
    @Inject('SubcategoryRepository')
    private readonly subcategoryRepository: SubcategoryRepository,
    private readonly categoryUsecase: CategoryUseCase,
    @Inject(forwardRef(() => ProductUseCase))
    private readonly productsUsecase: ProductUseCase,
  ) {}

  async create(
    payload: CreateSubcategoriesPayload,
  ): Promise<SubcategoryEntity> {
    const { categoryId, productIds } = payload;

    const [category, products] = await Promise.all([
      categoryId ? this.categoryUsecase.findOneById(categoryId) : undefined,
      productIds ? this.productsUsecase.findBySkus(productIds) : [],
    ]);

    const subcategoryValue = new SubcategoryValue().create(
      payload,
      category,
      products,
    );

    return this.subcategoryRepository.create(subcategoryValue);
  }

  async findOneById(id: string): Promise<SubcategoryEntity> {
    const subcategory = await this.subcategoryRepository.findOneById(id);

    if (!subcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }

    return subcategory;
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
    const outdatedSubcategory = await this.findOneById(payload.id);

    const { categoryId, productIds } = payload;

    const [category, products] = await Promise.all([
      categoryId ? this.categoryUsecase.findOneById(categoryId) : undefined,
      productIds ? this.productsUsecase.findBySkus(productIds) : [],
    ]);

    const subcategoryValue = new SubcategoryValue().update(
      payload,
      category,
      products,
    );

    return this.subcategoryRepository.update(
      subcategoryValue,
      outdatedSubcategory,
    );
  }

  async delete(id: string): Promise<any> {
    const result = await this.subcategoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return result;
  }
}
