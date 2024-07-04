import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateProductDTO {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: string;
  @ApiPropertyOptional({ description: 'Product name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  readonly description: string;
}

export class FindProductsDTO {
  @ApiProperty({ description: 'Products ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
