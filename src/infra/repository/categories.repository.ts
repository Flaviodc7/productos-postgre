import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from '@categoriesDomain/entities/category.entity';
import { CategoryRepository } from '@categoriesDomain/categories.repository';
import { CategoryModel } from '@models/categories.model';

@Injectable()
export class CategoryPostgreRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>,
  ) {}

  findAll() {
    return this.categoryRepository.find({ relations: ['subcategories'] });
  }

  async findOneById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['subcategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} no encontrado`);
    }
    return category;
  }

  async findByIds(ids: string[]) {
    return this.categoryRepository.find({
      where: { id: In(ids) },
      relations: ['subcategories'],
    });
  }

  async create(payload: CategoryEntity) {
    const newCategory = this.categoryRepository.create(payload);

    return this.categoryRepository.save(newCategory);
  }

  async update(id: string, payload: CategoryEntity) {
    const category = await this.findOneById(id);

    this.categoryRepository.merge(category, payload);
    return this.categoryRepository.save(category);
  }

  delete(id: string) {
    return this.categoryRepository.delete(id);
  }
}
