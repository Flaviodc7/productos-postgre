import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { SubcategoryModel } from './subcategories.model';

@Entity()
export class ProductModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  sku: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'text', default: '' })
  description?: string;

  @Column({ type: 'text', default: '' })
  photoUrl?: string;

  @Column({ type: 'text', default: '' })
  ean?: string;

  @ManyToMany(() => SubcategoryModel, (subcategory) => subcategory.products)
  subcategories?: SubcategoryModel[];
}
