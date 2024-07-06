import {
  CreateProductPayload,
  IProductUseCase,
  UpdateProductPayload,
} from './product.usecase.interface';
import { ProductEntity } from '@productDomain/entities/product.entity';
import { ProductRepository } from '@productDomain/product.repository';
import { ProductValue } from '@productDomain/product.value';
import { ProductModel } from '@models/product.model';

export class ProductUseCase implements IProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: CreateProductPayload): Promise<ProductModel> {
    const productValue = new ProductValue().create(data);

    return await this.productRepository.create(productValue);
  }

  async findOneById(id: string): Promise<ProductModel> {
    return await this.productRepository.findOneById(id);
  }

  async findByIds(ids: string[]): Promise<ProductModel[]> {
    return await this.productRepository.findByIds(ids);
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.productRepository.findAll();
  }

  async update(payload: UpdateProductPayload): Promise<ProductModel> {
    return await this.productRepository.update(payload);
  }

  async delete(id: string): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
