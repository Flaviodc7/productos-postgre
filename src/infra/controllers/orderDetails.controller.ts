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
import { OrderDetailsUseCase } from '@orderDetailsApplication/orderDetails.usecase';
import {
  FindOrderDetailsIdsDTO,
  UpdateOrderDetailsDTO,
} from '@dtos/orderDetails.dto';

@ApiTags('Categories')
@Controller('order')
export class OrderDetailsController {
  constructor(private readonly orderDetailsUseCase: OrderDetailsUseCase) {}

  @ApiOperation({ summary: 'Get an order Details by ID' })
  @Get(':orderDetailsId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrderDetailsById(@Param('orderDetailsId') orderDetailsId: string) {
    return this.orderDetailsUseCase.findOneById(orderDetailsId);
  }

  @ApiOperation({ summary: 'Get order Details by ids' })
  @Post('getorderdetails')
  getOrderDetailsByIds(@Body() payload: FindOrderDetailsIdsDTO) {
    return this.orderDetailsUseCase.findByIds(payload.ids);
  }

  @ApiOperation({ summary: 'Modify an order Details' })
  @Put()
  updateOrderDetails(@Body() payload: UpdateOrderDetailsDTO) {
    return this.orderDetailsUseCase.update(payload);
  }
}
