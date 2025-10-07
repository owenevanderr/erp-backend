"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EmployeesService = class EmployeesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        const capitalizedPosition = dto.position
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return this.prisma.employee.create({
            data: Object.assign(Object.assign({}, dto), { position: capitalizedPosition })
        });
    }
    findAll() {
        return this.prisma.employee.findMany();
    }
    async findOne(id) {
        const emp = await this.prisma.employee.findUnique({ where: { id } });
        if (!emp)
            throw new common_1.NotFoundException('Employee not found');
        return emp;
    }
    update(id, dto) {
        const updateData = Object.assign({}, dto);
        if (dto.position) {
            updateData.position = dto.position
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        return this.prisma.employee.update({ where: { id }, data: updateData });
    }
    async remove(id) {
        await this.prisma.workOrder.deleteMany({
            where: {
                assignedEmployeeId: id
            }
        });
        await this.prisma.attendance.deleteMany({
            where: {
                employeeId: id
            }
        });
        await this.prisma.payroll.deleteMany({
            where: {
                employeeId: id
            }
        });
        return this.prisma.employee.delete({ where: { id } });
    }
    attendance(dto) {
        return this.prisma.attendance.upsert({
            where: { employeeId_date: { employeeId: dto.employeeId, date: new Date(dto.date) } },
            update: { status: dto.status },
            create: { employeeId: dto.employeeId, date: new Date(dto.date), status: dto.status },
        });
    }
    async generatePayroll(dto) {
        const emp = await this.findOne(dto.employeeId);
        const base = emp.salary;
        const deductions = 0;
        const net = base - deductions;
        return this.prisma.payroll.upsert({
            where: { employeeId_month_year: { employeeId: emp.id, month: dto.month, year: dto.year } },
            update: { baseSalary: base, deductions, netSalary: net },
            create: { employeeId: emp.id, baseSalary: base, deductions, netSalary: net, month: dto.month, year: dto.year },
        });
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map