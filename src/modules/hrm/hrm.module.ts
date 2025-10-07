import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { AttendanceController } from './attendance.controller';
import { PayrollController } from './payroll.controller';

@Module({
  imports: [PrismaModule],
  providers: [EmployeesService],
  controllers: [EmployeesController, AttendanceController, PayrollController],
})
export class HrmModule {}




