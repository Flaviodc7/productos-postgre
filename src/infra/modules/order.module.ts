import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { OrderPostgreRepository } from '@repository/order.repository';
import { OrderController } from '@controllers/order.controller';
import { OrderUseCase } from '@orderApplication/order.usecase';
import { OrderModel } from '@models/order.model';
import { CustomerModule } from './customer.module';
import { OrderDetailsModule } from './orderDetails.module';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    forwardRef(() => OrderDetailsModule),
    TypeOrmModule.forFeature([OrderModel]), 
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepository',
      useClass: OrderPostgreRepository,
    },
    OrderUseCase,
  ],
  exports: [OrderUseCase, 'OrderRepository'],
})
export class OrderModule {}
