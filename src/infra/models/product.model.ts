import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { ProductEntity } from '@productDomain/entities/product.entity';
import { SubcategoryModel } from './subcategories.model';

@Entity()
export class ProductModel implements ProductEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  sku: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  photoUrl: string;

  @Column({ type: 'number' })
  price: number;

  @Column({ type: 'number' })
  stock: number;

  @Column({ type: 'text' })
  ean?: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => SubcategoryModel, (subcategory) => subcategory.products)
  subcategories: SubcategoryModel[];
}
