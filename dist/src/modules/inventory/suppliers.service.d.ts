import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto, UpdateSupplierDto } from './suppliers.dto';
export declare class SuppliersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSupplierDto): import(".prisma/client").Prisma.Prisma__SupplierClient<{
        id: string;
        name: string;
        contact: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        products: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            stock: number;
            unit: string;
            lowStockThreshold: number;
            supplierId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        contact: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            stock: number;
            unit: string;
            lowStockThreshold: number;
            supplierId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        contact: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateSupplierDto): import(".prisma/client").Prisma.Prisma__SupplierClient<{
        id: string;
        name: string;
        contact: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        contact: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
