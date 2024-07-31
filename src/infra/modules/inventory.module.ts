import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InventoryPostgreRepository } from '@repository/inventory.repository';
import { InventoryUseCase } from '@inventoryApplication/inventory.usecase';
import { InventoryController } from '@controllers/inventory.controller';
import { InventoryModel } from '@models/inventory/inventory.model';
import { InventoryAuditModel } from '@models/inventory/inventoryAudit.model';
import { InventoryProductsModel } from '@models/inventory/inventoryProducts.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryModel,
      InventoryAuditModel,
      InventoryProductsModel,
    ]),
  ],
  controllers: [InventoryController],
  providers: [
    InventoryPostgreRepository,
    {
      provide: InventoryUseCase,
      useClass: InventoryPostgreRepository,
    },
    InventoryUseCase,
  ],
  exports: [InventoryUseCase],
})
export class InventoryModule {}
