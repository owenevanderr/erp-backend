import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({ data: dto as any });
  }

  findAll() {
  return this.prisma.transaction.findMany({
    orderBy: { date: 'desc' },
    include: {
      supplier: true,
      customer: true,
    },
  });
}
}




