import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ description: 'Category ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: string;
  @ApiProperty({ description: 'Category name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'Category description' })
  @IsOptional()
  @IsString()
  readonly description: string;
  @ApiProperty({ description: 'Subcategory relation with a category' })
  @IsOptional()
  @IsString()
  readonly categoryId: string;
}

export class FindSubcategoriesDTO {
  @ApiProperty({ description: 'Subcategories ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly ids: string[];
}
