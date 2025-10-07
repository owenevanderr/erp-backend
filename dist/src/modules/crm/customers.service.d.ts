import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCustomerDto): import(".prisma/client").Prisma.Prisma__CustomerClient<{
        id: string;
        name: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string | null;
    }>;
    update(id: string, dto: UpdateCustomerDto): import(".prisma/client").Prisma.Prisma__CustomerClient<{
        id: string;
        name: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        phone: string | null;
    }>;
}
