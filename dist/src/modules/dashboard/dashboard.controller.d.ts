import { PrismaService } from '../../prisma/prisma.service';
export declare class DashboardController {
    private prisma;
    constructor(prisma: PrismaService);
    summary(): Promise<{
        lowStockCount: number;
        activeWorkOrders: number;
        cash: number;
    }>;
}
