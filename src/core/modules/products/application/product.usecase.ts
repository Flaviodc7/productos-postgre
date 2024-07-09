import { NotFoundException } from '@nestjs/common';
import {
  CreateProductPayload,
  IProductUseCase,
  UpdateProductPayload,
} from './product.usecase.interface';
import { SubcategoryUseCase } from '../../subcategories/application/subcategories.usecase';
import { ProductRepository } from '@productDomain/product.repository';
import { ProductValue } from '@productDomain/product.value';
import { ProductModel } from '@models/product.model';

export class ProductUseCase implements IProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly subcategoryUsecase: SubcategoryUseCase,
  ) {}

  async create(payload: CreateProductPayload): Promise<ProductModel> {
    const productValue = new ProductValue().create(payload) as ProductModel;

    if (payload.subcategoryIds) {
      const subcategories = await this.subcategoryUsecase.findByIds(
        payload.subcategoryIds,
      );
      productValue.subcategories = subcategories;
    }

    return await this.productRepository.create(productValue);
  }

  async findOneById(id: string): Promise<ProductModel> {
    const product = await this.productRepository.findOneById(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  async findByIds(ids: string[]): Promise<ProductModel[]> {
    const products = await this.productRepository.findByIds(ids);

    if (!products) {
      throw new NotFoundException(`Products not found`);
    }

    return products;
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.productRepository.findAll();
  }

  async update(payload: UpdateProductPayload): Promise<ProductModel> {
    const { id } = payload;

    const product = (await this.findOneById(id)) as ProductModel;

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (payload.subcategoryIds) {
      const subcategories = await this.subcategoryUsecase.findByIds(
        payload.subcategoryIds,
      );
      product.subcategories = subcategories;
    }

    return await this.productRepository.update(product, payload);
  }

  async delete(id: string): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
