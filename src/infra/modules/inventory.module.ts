import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InventoryPostgreRepository } from '@repository/inventory.repository';
import { InventoryUseCase } from '@inventoryApplication/inventory.usecase';
import { InventoryController } from '@controllers/inventory.controller';
import { InventoryModel } from '@models/inventory/inventory.model';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryModel])],
  controllers: [InventoryController],
  providers: [
    InventoryPostgreRepository,
    {
      provide: InventoryUseCase,
      useFactory: (inventoryRepo: InventoryPostgreRepository) => {
        return new InventoryUseCase(inventoryRepo);
      },
      inject: [InventoryPostgreRepository],
    },
  ],
  exports: [InventoryUseCase],
})
export class InventoryModule {}
