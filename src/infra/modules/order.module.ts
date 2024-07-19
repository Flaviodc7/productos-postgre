import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderPostgreRepository } from '@repository/order.repository';
import { OrderController } from '@controllers/order.controller';
import { OrderUseCase } from '@orderApplication/order.usecase';
import { OrderModel } from '@models/order.model';

@Module({
  imports: [TypeOrmModule.forFeature([OrderModel])],
  controllers: [OrderController],
  providers: [
    OrderPostgreRepository,
    {
      provide: OrderUseCase,
      useFactory: (orderRepo: OrderPostgreRepository) => {
        return new OrderUseCase(orderRepo);
      },
      inject: [OrderPostgreRepository],
    },
  ],
  exports: [OrderUseCase],
})
export class OrderModule {}
