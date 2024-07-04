import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SubcategoryEntity } from '@subcategoriesDomain/entities/subcategory.entity';
import { SubcategoryRepository } from '@subcategoriesDomain/subcategory.repository';
import { SubcategoryModel } from '@models/subcategories.model';

@Injectable()
export class SubcategoryPostgreRepository implements SubcategoryRepository {
  constructor(
    @InjectRepository(SubcategoryModel)
    private subcategoryRepository: Repository<SubcategoryModel>,
  ) {}

  findAll() {
    return this.subcategoryRepository.find();
  }

  async findOneById(id: string) {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: id },
    });
    if (!subcategory) {
      throw new NotFoundException(`Subsubcategory #${id} no encontrado`);
    }
    return subcategory;
  }

  async findByIds(ids: string[]) {
    return this.subcategoryRepository.findBy({ id: In(ids) });
  }

  async create(payload: SubcategoryEntity) {
    const newSubsubcategory = this.subcategoryRepository.create(payload);

    return this.subcategoryRepository.save(newSubsubcategory);
  }

  async update(id: string, payload: SubcategoryEntity) {
    const subcategory = await this.findOneById(id);

    this.subcategoryRepository.merge(subcategory, payload);
    return this.subcategoryRepository.save(subcategory);
  }

  delete(id: string) {
    return this.subcategoryRepository.delete(id);
  }
}
