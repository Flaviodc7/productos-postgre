import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderPostgreRepository } from '@repository/order.repository';
import { OrderUseCase } from '@orderApplication/order.usecase';
import { OrderController } from '@controllers/order.controller';
import { OrderModel } from '@models/order.model';

@Module({
  imports: [TypeOrmModule.forFeature([OrderModel])],
  controllers: [OrderController],
  providers: [
    OrderPostgreRepository,
    {
      provide: OrderUseCase,
      useFactory: (categoryRepo: OrderPostgreRepository) => {
        return new OrderUseCase(categoryRepo);
      },
      inject: [OrderPostgreRepository],
    },
  ],
  exports: [OrderUseCase],
})
export class OrderModule {}
