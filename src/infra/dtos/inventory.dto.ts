import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  Min,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { InventoryStatus } from '@inventoryDomain/entities/inventory.entity';

export class AuditStatusDTO {
  @ApiProperty({ description: 'Inventory Audit New Status' })
  @IsString()
  @IsNotEmpty()
  readonly newStatus: string;

  @ApiPropertyOptional({ description: 'Inventory Audit Previous Status' })
  @IsString()
  @IsOptional()
  readonly previousStatus?: string;

  @ApiProperty({ description: 'Inventory Audit Responsible' })
  @IsNumber()
  @Min(1)
  readonly responsible: string;
}

export class InventoryProductDTO {
  @ApiProperty({ description: 'Inventory Product SKU' })
  @IsString()
  @IsNotEmpty()
  readonly sku: string;

  @ApiProperty({ description: 'Inventory Product name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Inventory Product quantity' })
  @IsNumber()
  @Min(1)
  readonly quantity: number;
}

export class CreateInventoryDTO {
  @ApiProperty({ description: 'Inventory Products' })
  @ValidateNested({ each: true })
  @Type(() => InventoryProductDTO)
  @IsArray()
  readonly inventoryProducts: InventoryProductDTO[];
}

export class UpdateInventoryDTO extends CreateInventoryDTO {
  @ApiProperty({ description: 'Inventory ID' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'Inventory Audit Status' })
  @ValidateNested({ each: true })
  @Type(() => AuditStatusDTO)
  @IsArray()
  readonly auditStatus: AuditStatusDTO[];

  @ApiProperty({ description: 'Inventory Creation Date' })
  @IsString()
  @IsNotEmpty()
  readonly createdAt: string;

  @ApiProperty({ description: 'Inventory Current Status' })
  @IsString()
  @IsNotEmpty()
  readonly currentStatus: InventoryStatus;
}

export class FindInventoriesDTO {
  @ApiProperty({ description: 'Inventories ID' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly ids: string[];
}
