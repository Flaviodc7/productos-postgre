import {
  BadRequestException,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
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
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
    @Inject(forwardRef(() => SubcategoryUseCase))
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

  async findOneBySku(sku: string): Promise<ProductModel> {
    const product = await this.productRepository.findOneBySku(sku);

    if (!product) {
      throw new NotFoundException(`Product #${sku} not found`);
    }

    return product;
  }

  async findBySkus(skus: string[]): Promise<ProductModel[]> {
    const products = await this.productRepository.findBySkus(skus);

    if (!products) {
      throw new NotFoundException(`Products not found`);
    }

    return products;
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.productRepository.findAll();
  }

  async update(payload: UpdateProductPayload): Promise<ProductModel> {
    const { sku } = payload;

    const product = await this.findOneBySku(sku);

    if (!product) {
      throw new NotFoundException(`Product #${sku} not found`);
    }

    if (payload.subcategoryIds) {
      const subcategories = await this.subcategoryUsecase.findByIds(
        payload.subcategoryIds,
      );
      product.subcategories = subcategories;
    }

    return await this.productRepository.update(product, payload);
  }

  async updateStockOrder(sku: string, quantity: number): Promise<ProductModel> {
    const product = await this.findOneBySku(sku);

    if (!product) {
      throw new NotFoundException(`Product #${sku} not found`);
    }

    if (product.stock > quantity) {
      product.stock -= quantity;
    } else {
      throw new BadRequestException(
        'Product has not enough stock for this operation',
      );
    }

    return await this.productRepository.updateStockOrder(product);
  }

  async delete(sku: string): Promise<any> {
    return await this.productRepository.delete(sku);
  }
}
