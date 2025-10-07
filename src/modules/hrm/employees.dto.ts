import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  position!: string;

  @ApiProperty()
  @IsNumber()
  salary!: number;
}

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  position?: string;
  @IsOptional()
  @IsNumber()
  salary?: number;
}

export class AttendanceDto {
  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiProperty()
  @IsDateString()
  date!: string;

  @ApiProperty({ enum: ['PRESENT', 'ABSENT'] })
  @IsEnum(['PRESENT', 'ABSENT'] as any)
  status!: 'PRESENT' | 'ABSENT';
}

export class GeneratePayrollDto {
  @ApiProperty()
  @IsString()
  employeeId!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  month!: number;

  @ApiProperty()
  @IsInt()
  year!: number;
}


