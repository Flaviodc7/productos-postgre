import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { InventoryModel } from './inventory.model';

@Entity()
export class InventoryProductsModel {
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
