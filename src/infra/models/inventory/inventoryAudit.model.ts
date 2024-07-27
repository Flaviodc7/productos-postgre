import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { InventoryModel } from './inventory.model';

@Entity()
export class AuditStatusModel {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  newStatus: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  previousStatus?: string;

  @Column({ type: 'varchar', length: 255 })
  responsible: string;

  @Column({ type: 'varchar', length: 255 })
  updateDate: string;

  @ManyToOne(() => InventoryModel, (inventory) => inventory.auditStatus)
  inventory: InventoryModel;
}
