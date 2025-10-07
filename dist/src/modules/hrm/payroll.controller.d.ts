import { PrismaService } from '../../prisma/prisma.service';
export declare class PayrollController {
    private prisma;
    constructor(prisma: PrismaService);
    list(employeeId?: string, month?: string, year?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employeeId: string;
        baseSalary: import("@prisma/client/runtime/library").Decimal;
        deductions: import("@prisma/client/runtime/library").Decimal;
        netSalary: import("@prisma/client/runtime/library").Decimal;
        month: number;
        year: number;
    }[]>;
}
