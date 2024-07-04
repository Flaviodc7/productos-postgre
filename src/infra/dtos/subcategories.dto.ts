import { IsNotEmpty, IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubcategoryDTO {
  @ApiProperty({ description: 'Subcategory name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'Subcategory description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty({ description: 'Subcategory relation with a category' })
  @IsString()
  @IsNotEmpty()
  readonly categoryId: string;
}

export class UpdateSubcategoryDTO {
  @ApiProperty({ description: 'Subcategory ID' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @ApiPropertyOptional({ description: 'Subcategory name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiPropertyOptional({ description: 'Subcategory description' })
  @IsOptional()
  @IsString()
  readonly description: string;
  @ApiPropertyOptional({ description: 'Subcategory relation with a category' })
  @IsOptional()
  @IsString()
  readonly categoryId: string;
}

export class FindSubcategoriesDTO {
  @ApiProperty({ description: 'Subcategories ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
