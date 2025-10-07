import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('hrm/payroll')
@ApiBearerAuth()
@Controller('hrm/payroll')
export class PayrollController {
  constructor(private prisma: PrismaService) {}

  @Get()
  list(@Query('employeeId') employeeId?: string, @Query('month') month?: string, @Query('year') year?: string) {
    return this.prisma.payroll.findMany({
      where: {
        employeeId: employeeId || undefined,
        month: month ? Number(month) : undefined,
        year: year ? Number(year) : undefined,
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
  }
}




