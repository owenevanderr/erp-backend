import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateWorkOrderDto {
  @ApiProperty()
  @IsString()
  productId!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiProperty()
  @IsDateString()
  dueDate!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  assignedEmployeeId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateWorkOrderStatusDto {
  @ApiProperty({ enum: ['PLANNED', 'IN_PROGRESS', 'COMPLETED'] })
  @IsEnum(['PLANNED', 'IN_PROGRESS', 'COMPLETED'] as any)
  status!: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
}




