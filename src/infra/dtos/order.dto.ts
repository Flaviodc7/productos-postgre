import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  Min,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MethodType, OrderStatus, PaymentStatus } from '../utils/enum.types';

export class PaymentDetailsDTO {
  @ApiProperty({ description: 'Payment method' })
  @IsEnum(MethodType)
  @IsNotEmpty()
  readonly method: MethodType;

  @ApiProperty({ description: 'Payment status' })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  readonly paymentStatus: PaymentStatus;
}

export class ProductOrderDTO {
  @ApiProperty({ description: 'Product SKU' })
  @IsString()
  @IsNotEmpty()
  readonly sku: string;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiProperty({ description: 'Product quantity' })
  @IsNumber()
  @Min(1)
  readonly quantity: number;
}

export class OrderDeliveryDTO {
  @ApiProperty({ description: 'Delivery Address' })
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiProperty({ description: 'Delivery City' })
  @IsString()
  @IsOptional()
  readonly city: string;

  @ApiProperty({ description: 'Delivery Postal Code' })
  @IsString()
  @IsOptional()
  readonly postalCode: string;

  @ApiProperty({ description: 'Delivery State' })
  @IsString()
  @IsOptional()
  readonly state: string;

  @ApiProperty({ description: 'Delivery Country' })
  @IsString()
  @IsOptional()
  readonly country: string;
}

export class OrderDetailsDTO {
  @ApiProperty({ description: 'Payment details' })
  @ValidateNested()
  @Type(() => PaymentDetailsDTO)
  readonly paymentDetails: PaymentDetailsDTO;

  @ApiProperty({
    description: 'Products in the order',
    type: [ProductOrderDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDTO)
  @IsArray()
  readonly productsOrder: ProductOrderDTO[];

  @ApiPropertyOptional({ description: 'Delivery details' })
  @ValidateNested()
  @Type(() => OrderDeliveryDTO)
  @IsOptional()
  readonly delivery?: OrderDeliveryDTO;
}

export class CreateOrderDTO {
  @ApiProperty({ description: 'Order Customer ID' })
  @IsString()
  @IsNotEmpty()
  readonly customerId: string;

  @ApiPropertyOptional({ description: 'Order Details' })
  @ValidateNested()
  @Type(() => OrderDetailsDTO)
  @IsOptional()
  readonly details: OrderDetailsDTO;

  @ApiPropertyOptional({ description: 'Order Details' })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  readonly status: OrderStatus;
}

export class UpdateOrderDTO extends CreateOrderDTO {
  @ApiProperty({ description: 'Order ID' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @ApiProperty({ description: 'Order Creation Date' })
  @IsString()
  @IsNotEmpty()
  readonly createdAt: string;
  @ApiProperty({ description: 'Order Details ID' })
  @IsString()
  @IsNotEmpty()
  readonly orderDetailsId: string;
}

export class FindOrdersIdsDTO {
  @ApiProperty({ description: 'Orders ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
