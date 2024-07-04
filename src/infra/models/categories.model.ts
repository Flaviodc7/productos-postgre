import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CategoryEntity } from '@categoriesDomain/entities/category.entity';
import { SubcategoryModel } from './subcategories.model';

@Entity()
export class CategoryModel implements CategoryEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => SubcategoryModel, subcategory => subcategory.category)
  subcategories: SubcategoryModel[];
}