import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryRepository } from '@categoriesDomain/categories.repository';
import { CategoryEntity } from '@categoriesDomain/entities/category.entity';
import { CategoryModel } from '@models/categories.model';

@Injectable()
export class CategoryPostgreRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>,
  ) {}

  async findAll(): Promise<CategoryModel[]> {
    return await this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOneById(id: string): Promise<CategoryModel> {
    return await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['subcategories'],
    });
  }

  async findByIds(ids: string[]): Promise<CategoryModel[]> {
    return await this.categoryRepository.find({
      where: { id: In(ids) },
      relations: ['subcategories'],
    });
  }

  async create(payload: CategoryEntity): Promise<CategoryModel> {
    const newCategory = this.categoryRepository.create(payload);

    return await this.categoryRepository.save(newCategory);
  }

  async update(
    category: CategoryModel,
    payload: CategoryEntity,
  ): Promise<CategoryModel> {
    this.categoryRepository.merge(category, payload);
    return await this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<any> {
    return await this.categoryRepository.delete(id);
  }
}
