import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MethodType, PaymentStatus } from '../utils/enum.types';

class OrderDeliveryDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  state: string;

  @IsString()
  country: string;
}

class PaymentDetailsDto {
  @IsEnum(MethodType)
  method: MethodType;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}

class ProductOrderDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsInt()
  quantity: number;
}

export class UpdateOrderDetailsDTO {
  @IsString()
  id: string;

  @IsString()
  orderId: string;

  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  payment: PaymentDetailsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  products: ProductOrderDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderDeliveryDto)
  delivery?: OrderDeliveryDto;
}

export class FindOrderDetailsIdsDTO {
  @ApiProperty({ description: 'Order Details ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
