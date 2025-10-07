import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportsController {
    private prisma;
    constructor(prisma: PrismaService);
    incomeStatement(month?: string, year?: string): Promise<{
        revenue: number;
        expenses: number;
        profit: number;
    }>;
    cashFlow(year?: string): Promise<{
        month: number;
        net: number;
    }[]>;
    balanceOverview(): Promise<{
        cash: number;
    }>;
}
