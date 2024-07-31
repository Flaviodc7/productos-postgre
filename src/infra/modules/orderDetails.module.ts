import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { OrderDetailsUseCase } from '@orderDetailsApplication/orderDetails.usecase';
import { OrderDetailsPostgreRepository } from '@repository/orderDetails.repository';
import { OrderDetailsController } from '@controllers/orderDetails.controller';
import { OrderDeliveryModel } from '@models/orderDetails/orderDelivery.model';
import { OrderDetailsModel } from '@models/orderDetails/orderDetails.model';
import { OrderPaymentModel } from '@models/orderDetails/orderPayment.model';
import { OrderProductModel } from '@models/orderDetails/orderProduct.model';
import { OrderAuditModel } from '@models/orderDetails/orderAudit.model';
import { ProductModule } from './products.module';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([
      OrderDetailsModel,
      OrderAuditModel,
      OrderDeliveryModel,
      OrderPaymentModel,
      OrderProductModel,
    ]),
  ],
  controllers: [OrderDetailsController],
  providers: [
    {
      provide: 'OrderDetailsRepository',
      useClass: OrderDetailsPostgreRepository,
    },
    OrderDetailsUseCase,
  ],
  exports: [OrderDetailsUseCase, 'OrderDetailsRepository'],
})
export class OrderDetailsModule {}
