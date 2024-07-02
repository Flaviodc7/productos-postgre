import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;
}
