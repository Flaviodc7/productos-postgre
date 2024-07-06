import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubcategoryPostgreRepository } from '@repository/subcategories.repository';
import { ProductEntity } from '@productDomain/entities/product.entity';
import { ProductRepository } from '@productDomain/product.repository';
import { ProductModel } from '@models/product.model';

@Injectable()
export class ProductPostgreRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private productRepository: Repository<ProductModel>,
    private subcategoriesRepository: SubcategoryPostgreRepository,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    return await this.productRepository.find();
  }

  async findOneById(id: string): Promise<ProductModel> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async findByIds(ids: string[]): Promise<ProductModel[]> {
    const products = await this.productRepository.findBy({ id: In(ids) });

    if (!products) {
      throw new NotFoundException(`Products not found`);
    }

    return products;
  }

  async create(payload: ProductEntity): Promise<ProductModel> {
    const newProduct = this.productRepository.create(payload);

    return await this.productRepository.save(newProduct);
  }

  async update(payload: ProductEntity): Promise<ProductModel> {
    const { id } = payload;

    const product = (await this.findOneById(id)) as any;

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (payload.subcategoryIds) {
      const subcategories = await this.subcategoriesRepository.findByIds(
        payload.subcategoryIds,
      );
      product.subcategories = subcategories;
    }

    this.productRepository.merge(product, payload);
    return await this.productRepository.save(product);
  }

  async delete(id: string): Promise<any> {
    return await this.productRepository.delete(id);
  }
}
