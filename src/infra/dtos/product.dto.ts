import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  readonly description?: string;
  @ApiPropertyOptional({ description: 'Associated subcategories' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  readonly subcategoryIds?: string[];
}

export class UpdateProductDTO {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @ApiPropertyOptional({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  readonly description?: string;
  @ApiPropertyOptional({ description: 'Associated subcategories' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  readonly subcategoryIds?: string[];
}

export class FindProductsDTO {
  @ApiProperty({ description: 'Products ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
