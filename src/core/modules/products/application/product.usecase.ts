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
  UpdateProductsInventoryPayload,
  UpdateProductsOrderPayload,
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

    if (!products || products.length === 0) {
      throw new NotFoundException(`Products not found`);
    }

    const foundProducts = products.map((product) => product.sku);
    const missingProducts = skus.filter((sku) => !foundProducts.includes(sku));

    if (missingProducts.length > 0) {
      throw new BadRequestException(
        `Products not found for SKUs: ${missingProducts.join(', ')}`,
      );
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

  async updateStockOrder(
    productsOrder: UpdateProductsOrderPayload[],
  ): Promise<ProductModel[]> {
    const updatedProducts: ProductModel[] = [];

    for (const productDetail of productsOrder) {
      const { sku, quantity } = productDetail;
      const product = await this.findOneBySku(sku);

      if (!product) {
        throw new NotFoundException(`Product #${sku} not found`);
      }
      product.stock -= quantity;

      if (product.stock < 0) {
        throw new BadRequestException(`Product #${sku} has not enough stock`);
      }

      updatedProducts.push(product);
    }

    for (const productUpdated of updatedProducts) {
      const { sku } = productUpdated;
      const product = await this.findOneBySku(sku);
      await this.productRepository.updateStock(product);
    }

    return updatedProducts;
  }

  async updateStockInventory(
    productsInventory: UpdateProductsInventoryPayload[],
  ): Promise<ProductModel[]> {
    const updatedProducts: ProductModel[] = [];

    for (const productDetail of productsInventory) {
      const { sku, quantity } = productDetail;
      const product = await this.findOneBySku(sku);

      if (!product) {
        throw new NotFoundException(`Product #${sku} not found`);
      }
      product.stock += quantity;
      updatedProducts.push(product);
    }

    for (const productUpdated of updatedProducts) {
      const { sku } = productUpdated;
      const product = await this.findOneBySku(sku);
      await this.productRepository.updateStock(product);
    }

    return updatedProducts;
  }

  async delete(sku: string): Promise<any> {
    const result = await this.productRepository.delete(sku);

    if (result.affected === 0) {
      throw new NotFoundException(`Product #${sku} not found`);
    }

    return result;
  }
}
