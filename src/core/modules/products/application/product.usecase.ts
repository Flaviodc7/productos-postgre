import { ProductRepository } from '@productDomain/product.repository';
import { ProductValue } from '@productDomain/product.value';
import { IProductUseCase } from './product.usecase.interface';

export class ProductUseCase implements IProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: any): Promise<any> {
    const productValue = new ProductValue().create(data);

    return await this.productRepository.create(productValue);
  }

  async findOneById(id: string): Promise<any> {
    return await this.productRepository.findOneById(id);
  }

  async findByIds(ids: string[]): Promise<any> {
    return await this.productRepository.findByIds(ids);
  }

  async findAll(): Promise<any[]> {
    return await this.productRepository.findAll();
  }

  async update(id: string, data: any): Promise<any> {
    return await this.productRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.productRepository.delete(id);
  }
}
