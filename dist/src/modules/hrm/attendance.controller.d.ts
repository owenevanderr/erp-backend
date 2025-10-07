import { PrismaService } from '../../prisma/prisma.service';
export declare class AttendanceController {
    private prisma;
    constructor(prisma: PrismaService);
    list(employeeId?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AttendanceStatus;
        date: Date;
        employeeId: string;
    }[]>;
}
