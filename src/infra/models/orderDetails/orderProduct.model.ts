import { Column, Entity } from 'typeorm';

@Entity()
export class OrderProductModel {
  @Column({ type: 'varchar', length: 255 })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;
}
