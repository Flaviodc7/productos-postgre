import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { InventoryProductsModel } from '@models/inventory/inventoryProducts.model';
import { InventoryPostgreRepository } from '@repository/inventory.repository';
import { InventoryAuditModel } from '@models/inventory/inventoryAudit.model';
import { InventoryUseCase } from '@inventoryApplication/inventory.usecase';
import { InventoryController } from '@controllers/inventory.controller';
import { InventoryModel } from '@models/inventory/inventory.model';
import { ProductModule } from './products.module';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([
      InventoryModel,
      InventoryAuditModel,
      InventoryProductsModel,
    ]),
  ],
  controllers: [InventoryController],
  providers: [
    {
      provide: 'InventoryRepository',
      useClass: InventoryPostgreRepository,
    },
    InventoryUseCase,
  ],
  exports: [InventoryUseCase],
})
export class InventoryModule {}
