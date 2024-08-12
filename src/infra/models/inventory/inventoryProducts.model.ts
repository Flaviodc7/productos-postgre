import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { InventoryModel } from './inventory.model';
import { InventoryProductsEntity } from '@inventoryDomain/entities/inventoryProducts.entity';

@Entity()
export class InventoryProductsModel implements InventoryProductsEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => InventoryModel, (inventory) => inventory.inventoryProducts)
  inventory: InventoryModel;
}
