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

  async findAll(): Promise<ProductModel[]> {
    return await this.productRepository.find();
  }

  async findOneById(id: string): Promise<ProductModel> {
    return await this.productRepository.findOne({
      where: { id: id },
    });
  }

  async findByIds(ids: string[]): Promise<ProductModel[]> {
    return await this.productRepository.findBy({ id: In(ids) });
  }

  async create(payload: ProductEntity): Promise<ProductModel> {
    const newProduct = this.productRepository.create(payload);

    return await this.productRepository.save(newProduct);
  }

  async update(
    product: ProductModel,
    payload: ProductEntity,
  ): Promise<ProductModel> {
    this.productRepository.merge(product, payload);

    return await this.productRepository.save(product);
  }

  async delete(id: string): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
