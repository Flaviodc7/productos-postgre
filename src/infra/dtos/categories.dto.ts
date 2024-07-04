import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @ApiProperty({ description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'Category description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateCategoryDTO {
  @ApiProperty({ description: 'Category ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: string;
  @ApiPropertyOptional({ description: 'Category name'})
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiPropertyOptional({ description: 'Category description'})
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
