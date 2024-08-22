import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { CustomerPostgreRepository } from '@repository/customer.repository';
import { CustomerUseCase } from '@customersApplication/customer.usecase';
import { CustomerController } from '@controllers/customer.controller';
import { CustomerModel } from '@models/customer.model';
import { OrderModule } from './order.module';

@Module({
  imports: [
    forwardRef(() => OrderModule),
    TypeOrmModule.forFeature([CustomerModel])
  ],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'CustomerRepository',
      useClass: CustomerPostgreRepository,
    },
    CustomerUseCase,
  ],
  exports: [CustomerUseCase, 'CustomerRepository'],
})
export class CustomerModule {}
