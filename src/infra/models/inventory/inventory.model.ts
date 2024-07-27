import { InventoryStatus } from '@inventoryDomain/entities/inventory.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AuditStatusModel } from './inventoryAudit.model';
import { InventoryProductsModel } from './inventoryProducts.model';

@Entity()
export class InventoryModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar' })
  createdAt: string;

  @OneToMany(() => AuditStatusModel, (auditStatus) => auditStatus.inventory, {
    cascade: true,
  })
  auditStatus: AuditStatusModel[];

  @OneToMany(
    () => InventoryProductsModel,
    (inventoryProducts) => inventoryProducts.inventory,
    { cascade: true },
  )
  inventoryProducts: InventoryProductsModel[];

  @Column({ type: 'varchar', length: 50 })
  currentStatus: InventoryStatus;
}
