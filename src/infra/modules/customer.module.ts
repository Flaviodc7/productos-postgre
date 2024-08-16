import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CustomerController } from '@controllers/customer.controller';
import { CustomerPostgreRepository } from '@repository/customer.repository';
import { CustomerUseCase } from '@customersApplication/customer.usecase';
import { CustomerModel } from '@models/customer.model';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerModel])],
  controllers: [CustomerController],
  providers: [
    CustomerPostgreRepository,
    {
      provide: CustomerUseCase,
      useClass: CustomerPostgreRepository,
    },
    CustomerUseCase
  ],
  exports: [CustomerUseCase],
})
export class CustomerModule {}
