import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { OrderDetailsUseCase } from '@orderDetailsApplication/orderDetails.usecase';
import { OrderDetailsPostgreRepository } from '@repository/orderDetails.repository';
import { OrderDetailsController } from '@controllers/orderDetails.controller';
import { OrderDetailsModel } from '@models/orderDetails.model';
import { ProductModule } from './products.module';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([OrderDetailsModel]),
  ],
  controllers: [OrderDetailsController],
  providers: [
    {
      provide: 'OrderDetailsRepository',
      useClass: OrderDetailsPostgreRepository,
    },
    OrderDetailsUseCase,
  ],
  exports: [OrderDetailsUseCase],
})
export class OrderDetailsModule {}
