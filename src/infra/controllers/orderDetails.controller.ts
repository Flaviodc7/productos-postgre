import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  FindOrderDetailsIdsDTO,
  UpdateOrderDetailsDTO,
} from '@dtos/orderDetails.dto';
import { OrderDetailsUseCase } from '@orderDetailsApplication/orderDetails.usecase';

@ApiTags('Order Details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsUseCase: OrderDetailsUseCase) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  getAllOrders() {
    return this.orderDetailsUseCase.findAll();
  }


  @ApiOperation({ summary: 'Get an order Details by ID' })
  @Get(':orderDetailsId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrderDetailsById(@Param('orderDetailsId') orderDetailsId: string) {
    return this.orderDetailsUseCase.findOneById(orderDetailsId);
  }

  @ApiOperation({ summary: 'Get order Details by ids' })
  @Post('getorderdetailsbyids')
  getOrderDetailsByIds(@Body() payload: FindOrderDetailsIdsDTO) {
    return this.orderDetailsUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify an order Details' })
  @Put()
  updateOrderDetails(@Body() payload: UpdateOrderDetailsDTO) {
    return this.orderDetailsUseCase.update(payload);
  }
}
