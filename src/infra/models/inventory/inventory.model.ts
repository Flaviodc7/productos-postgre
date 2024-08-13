import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import {
  InventoryEntity,
  InventoryStatus,
} from '@inventoryDomain/entities/inventory.entity';
import { InventoryProductsModel } from './inventoryProducts.model';
import { InventoryAuditModel } from './inventoryAudit.model';

@Entity()
export class InventoryModel implements InventoryEntity {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar' })
  createdAt: string;

  @OneToMany(
    () => InventoryAuditModel,
    (auditStatus) => auditStatus.inventory,
    {
      cascade: true,
    },
  )
  inventoryAudit: InventoryAuditModel[];

  @OneToMany(
    () => InventoryProductsModel,
    (inventoryProducts) => inventoryProducts.inventory,
    { cascade: true },
  )
  inventoryProducts: InventoryProductsModel[];

  @Column({ type: 'varchar', length: 50 })
  currentStatus: InventoryStatus;
}
