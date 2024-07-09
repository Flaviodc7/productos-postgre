import { NotFoundException } from '@nestjs/common';
import {
  CreateSubcategoriesPayload,
  ISubcategoriesUseCase,
  UpdateSubcategoriesPayload,
} from './subcategories.usecase.interface';
import { SubcategoryEntity } from '@subcategoriesDomain/entities/subcategory.entity';
import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { CategoryUseCase } from '@categoriesApplication/categories.usecase';
import { SubcategoryValue } from '@subcategoriesDomain/subcategory.value';
import { ProductUseCase } from '@productApplication/product.usecase';
import { SubcategoryModel } from '@models/subcategories.model';

export class SubcategoryUseCase implements ISubcategoriesUseCase {
  constructor(
    private readonly subcategoryRepository: SubcategoryRepository,
    private readonly categoryUsecase: CategoryUseCase,
    private readonly productsUsecase: ProductUseCase,
  ) {}

  async create(
    payload: CreateSubcategoriesPayload,
  ): Promise<SubcategoryEntity> {
    const subcategoryValue = new SubcategoryValue().create(
      payload,
    ) as SubcategoryModel;

    if (payload.categoryId) {
      const category = await this.categoryUsecase.findOneById(
        payload.categoryId,
      );
      subcategoryValue.category = category;
    }

    if (payload.productIds) {
      const products = await this.productsUsecase.findByIds(payload.productIds);

      subcategoryValue.products = products;
    }

    return await this.subcategoryRepository.create(subcategoryValue);
  }

  async findOneById(id: string): Promise<SubcategoryEntity> {
    return await this.subcategoryRepository.findOneById(id);
  }

  async findByIds(ids: string[]): Promise<SubcategoryModel[]> {
    return await this.subcategoryRepository.findByIds(ids);
  }

  async findAll(): Promise<SubcategoryEntity[]> {
    return await this.subcategoryRepository.findAll();
  }

  async update(
    payload: UpdateSubcategoriesPayload,
  ): Promise<SubcategoryEntity> {
    const { id } = payload;

    const updatedSubcategory = (await this.findOneById(id)) as SubcategoryModel;

    if (!updatedSubcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }

    if (payload.categoryId) {
      const category = await this.categoryUsecase.findOneById(
        payload.categoryId,
      );
      updatedSubcategory.category = category;
    }

    if (payload.productIds) {
      const products = await this.productsUsecase.findByIds(payload.productIds);

      updatedSubcategory.products = products;
    }

    return await this.subcategoryRepository.update(updatedSubcategory, payload);
  }

  async delete(id: string): Promise<any> {
    return await this.subcategoryRepository.delete(id);
  }
}
