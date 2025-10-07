import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ enum: ['CASH_IN', 'CASH_OUT'] })
  @IsEnum(['CASH_IN', 'CASH_OUT'] as any)
  type!: 'CASH_IN' | 'CASH_OUT';

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  supplierId?: string; // ✅ add this
}


