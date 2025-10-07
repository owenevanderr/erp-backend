import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ enum: ['ADMIN', 'STAFF', 'OWNER'], required: false })
  @IsOptional()
  @IsEnum(['ADMIN', 'STAFF', 'OWNER'] as any)
  role?: 'ADMIN' | 'STAFF' | 'OWNER';
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}


