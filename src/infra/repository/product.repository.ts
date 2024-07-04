import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll() {
    return this.productRepository.find();
  }

  async findOneById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} no encontrado`);
    }
    return product;
  }

  async findByIds(ids: string[]) {
    return this.productRepository.findBy({ id: In(ids) });
  }

  async create(payload: ProductEntity) {
    const newProduct = this.productRepository.create(payload);

    return this.productRepository.save(newProduct);
  }

  async update(id: string, payload: ProductEntity) {
    const product = await this.findOneById(id);

    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }
}
