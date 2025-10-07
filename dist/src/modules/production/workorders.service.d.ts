import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkOrderDto, UpdateWorkOrderStatusDto } from './workorders.dto';
export declare class WorkOrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWorkOrderDto): Promise<{
        id: string;
        quantity: number;
        dueDate: Date;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        assignedEmployeeId: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            sku: string;
            stock: number;
            unit: string;
            lowStockThreshold: number;
            supplierId: string | null;
        };
        assignedEmployee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            position: string;
            salary: import("@prisma/client/runtime/library").Decimal;
        } | null;
    } & {
        id: string;
        quantity: number;
        dueDate: Date;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        assignedEmployeeId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        product: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            sku: string;
            stock: number;
            unit: string;
            lowStockThreshold: number;
            supplierId: string | null;
        };
        assignedEmployee: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            position: string;
            salary: import("@prisma/client/runtime/library").Decimal;
        } | null;
    } & {
        id: string;
        quantity: number;
        dueDate: Date;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        assignedEmployeeId: string | null;
    }>;
    updateStatus(id: string, dto: UpdateWorkOrderStatusDto): Promise<{
        id: string;
        quantity: number;
        dueDate: Date;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        assignedEmployeeId: string | null;
    }>;
}
