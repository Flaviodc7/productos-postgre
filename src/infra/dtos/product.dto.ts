import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ description: 'Product SKU' })
  @IsString()
  @IsNotEmpty()
  readonly sku: string;
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'Product price' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;
  @ApiProperty({ description: 'Product stock' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;
  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  readonly description?: string;
  @ApiPropertyOptional({ description: 'Product photo URL' })
  @IsOptional()
  @IsUrl()
  readonly photoUrl?: string;
  @ApiPropertyOptional({ description: 'Product EAN (European Article Number)' })
  @IsOptional()
  @IsString()
  readonly ean?: string;
  @ApiPropertyOptional({ description: 'Associated subcategories' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  readonly subcategoryIds?: string[];
}

export class UpdateProductDTO extends CreateProductDTO {}

export class FindProductsSkusDTO {
  @ApiProperty({ description: 'Array of Products SKUs' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly skus: string[];
}
