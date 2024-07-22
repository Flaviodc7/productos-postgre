import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInventoryDTO {
  @ApiProperty({ description: 'Inventory name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'Inventory description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateInventoryDTO {
  @ApiProperty({ description: 'Inventory ID' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @ApiPropertyOptional({ description: 'Inventory name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiPropertyOptional({ description: 'Inventory Creation Date' })
  @IsString()
  @IsNotEmpty()
  readonly createdAt: string;
  @ApiPropertyOptional({ description: 'Inventory description' })
  @IsOptional()
  @IsString()
  readonly description: string;
}

export class FindInventoriesDTO {
  @ApiProperty({ description: 'Inventories ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
