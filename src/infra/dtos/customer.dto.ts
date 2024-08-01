import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty({ description: 'Customer ID' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Customer surname' })
  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty({ description: 'Customer address' })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ description: 'Customer city' })
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({ description: 'Customer Postal Code' })
  @IsString()
  @IsNotEmpty()
  readonly postalCode: string;

  @ApiProperty({ description: 'Customer State' })
  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @ApiProperty({ description: 'Customer Country' })
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty({ description: 'Customer email' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Customer phone' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdateCustomerDTO extends CreateCustomerDTO {}
