import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private prisma: PrismaService) {}

  @Get('summary')
  async summary() {
    const [lowStockCount, activeWorkOrders, cashInAgg, cashOutAgg] = await Promise.all([
      this.prisma.$queryRawUnsafe<{ count: bigint }[]>(
        'SELECT COUNT(1)::bigint as count FROM "Product" WHERE "stock" < "lowStockThreshold"',
      ),
      this.prisma.workOrder.count({ where: { status: { in: ['PLANNED', 'IN_PROGRESS'] as any } } }),
      this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_IN' as any } }),
      this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_OUT' as any } }),
    ]);

    const low = Number((lowStockCount[0]?.count ?? 0) as any);
    const cash = Number(cashInAgg._sum.amount || 0) - Number(cashOutAgg._sum.amount || 0);
    return { lowStockCount: low, activeWorkOrders, cash };
  }
}




