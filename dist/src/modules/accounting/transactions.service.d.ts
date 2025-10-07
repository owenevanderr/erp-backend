import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './transactions.dto';
export declare class TransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTransactionDto): import(".prisma/client").Prisma.Prisma__TransactionClient<{
        id: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        customerId: string | null;
        supplierId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        customer: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            phone: string | null;
            address: string | null;
        } | null;
        supplier: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            contact: string | null;
        } | null;
    } & {
        id: string;
        type: import(".prisma/client").$Enums.TransactionType;
        amount: import("@prisma/client/runtime/library").Decimal;
        description: string | null;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
        customerId: string | null;
        supplierId: string | null;
    })[]>;
}
