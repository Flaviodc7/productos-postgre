import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { SubcategoryEntity } from '@subcategoriesDomain/entities/subcategory.entity';
import { ProductModel } from './product.model';
import { CategoryModel } from './categories.model';

@Entity()
export class SubcategoryModel implements SubcategoryEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  categoryId: string;

  @ManyToOne(() => CategoryModel, (category) => category.subcategories)
  category: CategoryModel;

  @ManyToMany(() => ProductModel, (product) => product.subcategories)
  @JoinTable({
    name: 'subcategory_products',
    joinColumn: {
      name: 'subcategory_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: ProductModel[];
}