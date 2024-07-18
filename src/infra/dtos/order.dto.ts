import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
import { Type } from 'class-transformer';

const ARRAY_PAYMENT_METHOD = ['CASH', 'DEBIT', 'CREDIT'];
const ARRAY_PAYMENT_STATUS = ['Approved', 'Failed', 'Pending'];
const ARRAY_ORDER_STATUS = ['CREATED', 'STAND-BY', 'CANCELED', 'COMPLETE'];
type PAYMENT_METHOD = 'CASH' | 'DEBIT' | 'CREDIT';
type PAYMENT_STATUS = 'Approved' | 'Failed' | 'Pending';
type ORDER_STATUS = 'CREATED' | 'STAND-BY' | 'CANCELED' | 'COMPLETE';

export class PaymentDetailsDTO {
  @ApiProperty({ description: 'Payment method' })
  @IsEnum(ARRAY_PAYMENT_METHOD)
  @IsNotEmpty()
  readonly method: PAYMENT_METHOD;

  @ApiProperty({ description: 'Payment status' })
  @IsEnum(ARRAY_PAYMENT_STATUS)
  @IsNotEmpty()
  readonly paymentStatus: PAYMENT_STATUS;
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
  @IsEnum(ARRAY_ORDER_STATUS)
  @IsNotEmpty()
  readonly status: ORDER_STATUS;
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
