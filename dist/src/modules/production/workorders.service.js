"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let WorkOrdersService = class WorkOrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.prisma.workOrder.create({
            data: {
                productId: dto.productId,
                quantity: dto.quantity,
                dueDate: new Date(dto.dueDate),
                assignedEmployeeId: dto.assignedEmployeeId,
                notes: dto.notes,
            },
        });
    }
    findAll() {
        return this.prisma.workOrder.findMany({ include: { product: true, assignedEmployee: true } });
    }
    async findOne(id) {
        const workOrder = await this.prisma.workOrder.findUnique({
            where: { id },
            include: {
                product: true,
                assignedEmployee: true,
            },
        });
        if (!workOrder)
            throw new common_1.NotFoundException('Work order not found');
        return workOrder;
    }
    async updateStatus(id, dto) {
        const wo = await this.prisma.workOrder.findUnique({ where: { id } });
        if (!wo)
            throw new common_1.NotFoundException('Work order not found');
        if (dto.status === 'COMPLETED') {
            const product = await this.prisma.product.findUnique({ where: { id: wo.productId } });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            await this.prisma.product.update({ where: { id: product.id }, data: { stock: product.stock + wo.quantity } });
        }
        return this.prisma.workOrder.update({ where: { id }, data: { status: dto.status } });
    }
};
exports.WorkOrdersService = WorkOrdersService;
exports.WorkOrdersService = WorkOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkOrdersService);
//# sourceMappingURL=workorders.service.js.map