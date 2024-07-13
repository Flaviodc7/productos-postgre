import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsArray,
    ArrayNotEmpty,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  export class CreateOrderDTO {
    @ApiProperty({ description: 'Order Customer ID' })
    @IsString()
    @IsNotEmpty()
    readonly customerId: string;
    @ApiProperty({ description: 'Order Details' })
    @IsString()
    @IsNotEmpty()
    readonly payment: string;
  }
  
  export class UpdateOrderDTO {
    @ApiProperty({ description: 'Order ID' })
    @IsString()
    @IsNotEmpty()
    readonly id: string;
    @ApiPropertyOptional({ description: 'Order name' })
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @ApiPropertyOptional({ description: 'Order description' })
    @IsOptional()
    @IsString()
    readonly description: string;
  }
  
  export class FindCategoriesDTO {
    @ApiProperty({ description: 'Categories ID' })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    readonly ids: string[];
  }
  