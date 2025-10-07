import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { AttendanceDto, CreateEmployeeDto, GeneratePayrollDto, UpdateEmployeeDto } from './employees.dto';

@ApiTags('hrm/employees')
@ApiBearerAuth()
@Controller('hrm/employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('attendance')
  attendance(@Body() dto: AttendanceDto) {
    return this.service.attendance(dto);
  }

  @Post('payroll')
  payroll(@Body() dto: GeneratePayrollDto) {
    return this.service.generatePayroll(dto);
  }
}




