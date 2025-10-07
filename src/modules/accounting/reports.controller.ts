import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('accounting/reports')
@ApiBearerAuth()
@Controller('accounting/reports')
export class ReportsController {
  constructor(private prisma: PrismaService) {}

  @Get('income-statement')
  async incomeStatement(@Query('month') month?: string, @Query('year') year?: string) {
    const where = {
      AND: [
        month ? { date: { gte: new Date(Number(year), Number(month) - 1, 1) } } : {},
        month ? { date: { lt: new Date(Number(year), Number(month), 1) } } : {},
      ],
    } as any;
    const cashIn = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { ...(where || {}), type: 'CASH_IN' as any } });
    const cashOut = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { ...(where || {}), type: 'CASH_OUT' as any } });
    const revenue = Number(cashIn._sum.amount || 0);
    const expenses = Number(cashOut._sum.amount || 0);
    return { revenue, expenses, profit: revenue - expenses };
  }

  @Get('cash-flow')
  async cashFlow(@Query('year') year?: string) {
    const out: Array<{ month: number; net: number }> = [];
    for (let m = 1; m <= 12; m++) {
      const start = new Date(Number(year), m - 1, 1);
      const end = new Date(Number(year), m, 1);
      const cashIn = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_IN' as any, date: { gte: start, lt: end } } });
      const cashOut = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_OUT' as any, date: { gte: start, lt: end } } });
      out.push({ month: m, net: Number(cashIn._sum.amount || 0) - Number(cashOut._sum.amount || 0) });
    }
    return out;
  }

  @Get('balance-overview')
  async balanceOverview() {
    const cashIn = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_IN' as any } });
    const cashOut = await this.prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: 'CASH_OUT' as any } });
    return { cash: Number(cashIn._sum.amount || 0) - Number(cashOut._sum.amount || 0) };
  }
}


