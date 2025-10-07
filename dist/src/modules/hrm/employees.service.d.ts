import { PrismaService } from '../../prisma/prisma.service';
import { AttendanceDto, CreateEmployeeDto, GeneratePayrollDto, UpdateEmployeeDto } from './employees.dto';
export declare class EmployeesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateEmployeeDto): import(".prisma/client").Prisma.Prisma__EmployeeClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        position: string;
        salary: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        position: string;
        salary: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        position: string;
        salary: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(id: string, dto: UpdateEmployeeDto): import(".prisma/client").Prisma.Prisma__EmployeeClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        position: string;
        salary: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        position: string;
        salary: import("@prisma/client/runtime/library").Decimal;
    }>;
    attendance(dto: AttendanceDto): import(".prisma/client").Prisma.Prisma__AttendanceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AttendanceStatus;
        date: Date;
        employeeId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    generatePayroll(dto: GeneratePayrollDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employeeId: string;
        baseSalary: import("@prisma/client/runtime/library").Decimal;
        deductions: import("@prisma/client/runtime/library").Decimal;
        netSalary: import("@prisma/client/runtime/library").Decimal;
        month: number;
        year: number;
    }>;
}
