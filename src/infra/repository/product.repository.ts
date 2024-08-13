import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '@productDomain/entities/product.entity';
import { ProductRepository } from '@productDomain/product.repository';
import { ProductModel } from '@models/product.model';

@Injectable()
export class ProductPostgreRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private productRepository: Repository<ProductModel>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOneBySku(sku: string): Promise<ProductEntity> {
    return await this.productRepository.findOne({
      where: { sku: sku },
    });
  }

  async findBySkus(skus: string[]): Promise<ProductEntity[]> {
    return await this.productRepository.findBy({ sku: In(skus) });
  }

  async create(payload: ProductEntity): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(payload);

    return await this.productRepository.save(newProduct);
  }

  async update(
    product: ProductModel,
    payload: ProductEntity,
  ): Promise<ProductEntity> {
    this.productRepository.merge(product, payload);

    return await this.productRepository.save(product);
  }

  async updateStock(product: ProductModel): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  async delete(sku: string): Promise<any> {
    return await this.productRepository.delete(sku);
  }
}
