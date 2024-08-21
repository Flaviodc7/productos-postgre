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
import {
  CreateOrderDTO,
  FindOrdersIdsDTO,
  UpdateOrderDTO,
} from '@dtos/order.dto';
import { OrderUseCase } from '@orderApplication/order.usecase';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  getAllOrders() {
    return this.orderUseCase.findAll();
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @Get(':orderId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrderById(@Param('orderId') orderId: string) {
    return this.orderUseCase.findOneById(orderId);
  }

  @ApiOperation({ summary: 'Create an order' })
  @Post()
  createOrder(@Body() payload: CreateOrderDTO) {
    return this.orderUseCase.create(payload);
  }

  @ApiOperation({ summary: 'Get order by ids' })
  @Post('getordersbyids')
  getOrdersByIds(@Body() payload: FindOrdersIdsDTO) {
    return this.orderUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify an order' })
  @Put()
  updateOrder(@Body() payload: UpdateOrderDTO) {
    return this.orderUseCase.update(payload);
  }

  @ApiOperation({ summary: 'Delete an order' })
  @Delete('/:orderId')
  deleteOrder(@Param('orderId') orderId: string) {
    return this.orderUseCase.delete(orderId);
  }
}
