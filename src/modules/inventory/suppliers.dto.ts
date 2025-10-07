import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  contact?: string;
  @IsOptional()
  @IsString()
  address?: string;
}




