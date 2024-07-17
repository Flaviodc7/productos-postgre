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
type PAYMENT_METHOD = 'CASH' | 'DEBIT' | 'CREDIT';
type PAYMENT_STATUS = 'Approved' | 'Failed' | 'Pending';

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
  @ApiProperty({ description: 'Delivery information' })
  @IsString()
  @IsOptional()
  readonly details?: string;
}

export class CreateOrderDTO {
  @ApiProperty({ description: 'Order Customer ID' })
  @IsString()
  @IsNotEmpty()
  readonly customerId: string;

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

export class UpdateOrderDTO extends CreateOrderDTO {
  @ApiProperty({ description: 'Order ID' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class FindOrdersIdsDTO {
  @ApiProperty({ description: 'Orders ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
