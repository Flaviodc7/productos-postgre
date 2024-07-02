import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ description: 'Product name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'Product description' })
  @IsOptional()
  @IsString()
  readonly description: string;
}

export class FindProductsDTO {
  @ApiProperty({ description: 'Products ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly ids: string[];
}
