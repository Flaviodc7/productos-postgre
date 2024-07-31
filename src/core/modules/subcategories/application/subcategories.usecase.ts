import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import {
  CreateSubcategoriesPayload,
  ISubcategoriesUseCase,
  UpdateSubcategoriesPayload,
} from './subcategories.usecase.interface';
import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { CategoryUseCase } from '@categoriesApplication/categories.usecase';
import { SubcategoryValue } from '@subcategoriesDomain/subcategory.value';
import { ProductUseCase } from '@productApplication/product.usecase';
import { SubcategoryModel } from '@models/subcategories.model';

export class SubcategoryUseCase implements ISubcategoriesUseCase {
  constructor(
    @Inject('SubcategoryRepository')
    private readonly subcategoryRepository: SubcategoryRepository,
    private readonly categoryUsecase: CategoryUseCase,
    @Inject(forwardRef(() => ProductUseCase))
    private readonly productsUsecase: ProductUseCase,
  ) {}

  async create(payload: CreateSubcategoriesPayload): Promise<SubcategoryModel> {
    const subcategoryValue = new SubcategoryValue().create(payload);
    const { categoryId, productIds, ...restSubcategory } = subcategoryValue;

    const subcategoryFormatted = { ...(restSubcategory as SubcategoryModel) };

    if (categoryId) {
      const category = await this.categoryUsecase.findOneById(categoryId);
      if (!category) {
        throw new NotFoundException(`Category #${categoryId} not found`);
      }
      subcategoryFormatted.category = category;
    }

    if (productIds) {
      const products = await this.productsUsecase.findBySkus(productIds);

      subcategoryFormatted.products = products;
    }

    return await this.subcategoryRepository.create(subcategoryFormatted);
  }

  async findOneById(id: string): Promise<SubcategoryModel> {
    const subcategory = await this.subcategoryRepository.findOneById(id);

    if (!subcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }

    return subcategory;
  }

  async findByIds(ids: string[]): Promise<SubcategoryModel[]> {
    return await this.subcategoryRepository.findByIds(ids);
  }

  async findAll(): Promise<SubcategoryModel[]> {
    return await this.subcategoryRepository.findAll();
  }

  async update(payload: UpdateSubcategoriesPayload): Promise<SubcategoryModel> {
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
      const products = await this.productsUsecase.findBySkus(
        payload.productIds,
      );

      updatedSubcategory.products = products;
    }

    return await this.subcategoryRepository.update(updatedSubcategory, payload);
  }

  async delete(id: string): Promise<any> {
    return await this.subcategoryRepository.delete(id);
  }
}
