import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return await this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOneById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['subcategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async findByIds(ids: string[]) {
    return await this.categoryRepository.find({
      where: { id: In(ids) },
      relations: ['subcategories'],
    });
  }

  async create(payload: CategoryEntity) {
    const newCategory = this.categoryRepository.create(payload);

    return await this.categoryRepository.save(newCategory);
  }

  async update(payload: CategoryEntity) {
    const { id } = payload;

    const category = await this.findOneById(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    this.categoryRepository.merge(category, payload);
    return await this.categoryRepository.save(category);
  }

  async delete(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
