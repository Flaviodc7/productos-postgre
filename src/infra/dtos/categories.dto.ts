import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ description: 'Category name' })
  @IsOptional()
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'Category description' })
  @IsOptional()
  @IsString()
  readonly description: string;
}

export class FindCategoriesDTO {
  @ApiProperty({ description: 'Categories ID' })
  @IsNumber()
  @IsNotEmpty()
  readonly ids: string[];
}
