import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        stock: number;
        unit: string;
        lowStockThreshold: number;
        supplierId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        supplier: {
            id: string;
            name: string;
            contact: string | null;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        stock: number;
        unit: string;
        lowStockThreshold: number;
        supplierId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        stock: number;
        unit: string;
        lowStockThreshold: number;
        supplierId: string | null;
    }>;
    update(id: string, dto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        stock: number;
        unit: string;
        lowStockThreshold: number;
        supplierId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        stock: number;
        unit: string;
        lowStockThreshold: number;
        supplierId: string | null;
    }>;
    adjustStock(id: string, quantity: number): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        stock: number;
        unit: string;
        lowStockThreshold: number;
        supplierId: string | null;
    }>;
    lowStock(): import(".prisma/client").Prisma.PrismaPromise<any[]>;
}
