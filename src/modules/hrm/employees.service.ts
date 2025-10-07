import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AttendanceDto, CreateEmployeeDto, GeneratePayrollDto, UpdateEmployeeDto } from './employees.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeDto) {
    // Capitalize each word in the position name
    const capitalizedPosition = dto.position
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return this.prisma.employee.create({ 
      data: { 
        ...dto, 
        position: capitalizedPosition 
      } 
    });
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  async findOne(id: string) {
    const emp = await this.prisma.employee.findUnique({ where: { id } });
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  update(id: string, dto: UpdateEmployeeDto) {
    // Capitalize position if it's being updated
    const updateData = { ...dto };
    if (dto.position) {
      updateData.position = dto.position
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return this.prisma.employee.update({ where: { id }, data: updateData });
  }

  async remove(id: string) {
    // First, delete all work orders assigned to this employee
    await this.prisma.workOrder.deleteMany({
      where: {
        assignedEmployeeId: id
      }
    });

    // Then, delete all attendance records for this employee
    await this.prisma.attendance.deleteMany({
      where: {
        employeeId: id
      }
    });

    // Then, delete all payroll records for this employee
    await this.prisma.payroll.deleteMany({
      where: {
        employeeId: id
      }
    });

    // Finally, delete the employee
    return this.prisma.employee.delete({ where: { id } });
  }

  attendance(dto: AttendanceDto) {
    return this.prisma.attendance.upsert({
      where: { employeeId_date: { employeeId: dto.employeeId, date: new Date(dto.date) } },
      update: { status: dto.status as any },
      create: { employeeId: dto.employeeId, date: new Date(dto.date), status: dto.status as any },
    });
  } 

  async generatePayroll(dto: GeneratePayrollDto) {
    const emp = await this.findOne(dto.employeeId);
    const base = emp.salary as unknown as number;
    const deductions = 0;
    const net = base - deductions;
    return this.prisma.payroll.upsert({
      where: { employeeId_month_year: { employeeId: emp.id, month: dto.month, year: dto.year } },
      update: { baseSalary: base, deductions, netSalary: net },
      create: { employeeId: emp.id, baseSalary: base, deductions, netSalary: net, month: dto.month, year: dto.year },
    });
  }
}




