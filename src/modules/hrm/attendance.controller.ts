import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('hrm/attendance')
@ApiBearerAuth()
@Controller('hrm/attendance')
export class AttendanceController {
  constructor(private prisma: PrismaService) {}

  @Get()
  list(@Query('employeeId') employeeId?: string) {
    return this.prisma.attendance.findMany({ where: { employeeId }, orderBy: { date: 'desc' } });
  }
}



