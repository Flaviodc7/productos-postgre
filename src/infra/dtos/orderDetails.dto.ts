import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  MethodType,
  PaymentStatus,
} from '@orderDetailsDomain/types/enum.types';
import { OrderDetailsEntity } from '@orderDetailsDomain/entities/orderDetails.entity';

class OrderDeliveryDTO {
  @ApiProperty({ description: 'Delivery ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Delivery Address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Delivery City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Delivery Postal Code' })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ description: 'Delivery State' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Delivery Country' })
  @IsString()
  @IsNotEmpty()
  country: string;
}

class OrderPaymentDTO {
  @ApiProperty({ description: 'Payment ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Payment Method' })
  @IsEnum(MethodType)
  method: MethodType;

  @ApiProperty({ description: 'Payment Status' })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}

class OrderProductDTO {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Product SKU' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product Price' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Product quantity' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Product orderDetails' })
  @IsNotEmpty()
  orderDetails: OrderDetailsEntity;
}

export class UpdateOrderDetailsDTO {
  @ApiProperty({ description: 'Order Details ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Order Details => Order ID' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: 'Payment Details' })
  @ValidateNested()
  @Type(() => OrderPaymentDTO)
  payment: OrderPaymentDTO;

  @ApiProperty({ description: 'List of Products' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDTO)
  products: OrderProductDTO[];

  @ApiPropertyOptional({ description: 'Delivery Details (optional)' })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderDeliveryDTO)
  delivery?: OrderDeliveryDTO;
}

export class FindOrderDetailsIdsDTO {
  @ApiProperty({ description: 'Order Details IDs' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
