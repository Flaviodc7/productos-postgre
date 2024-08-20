import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateCustomerDTO, UpdateCustomerDTO } from '@dtos/customer.dto';
import { CustomerUseCase } from '@customersApplication/customer.usecase';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerUseCase: CustomerUseCase) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  getAllCustomers() {
    return this.customerUseCase.findAll();
  }

  @ApiOperation({ summary: 'Get a customer by ID' })
  @Get(':customerId')
  @HttpCode(HttpStatus.ACCEPTED)
  getCustomerById(@Param('customerId') customerId: string) {
    return this.customerUseCase.findOneById(customerId);
  }

  @ApiOperation({ summary: 'Create a customer' })
  @Post()
  createCustomer(@Body() payload: CreateCustomerDTO) {
    return this.customerUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Modify a customer' })
  @Put()
  updateCustomer(@Body() payload: UpdateCustomerDTO) {
    return this.customerUseCase.update(payload);
  }

  @ApiOperation({ summary: 'Delete a customer' })
  @Delete('/:customerId')
  deleteCustomer(@Param('customerId') customerId: string) {
    return this.customerUseCase.delete(customerId);
  }
}
