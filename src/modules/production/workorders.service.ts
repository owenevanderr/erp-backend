import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWorkOrderDto, UpdateWorkOrderStatusDto } from './workorders.dto';

@Injectable()
export class WorkOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkOrderDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');
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

   async findOne(id: string) {
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id },
      include: {
        product: true,
        assignedEmployee: true,
      },
    });
    if (!workOrder) throw new NotFoundException('Work order not found');
    return workOrder;
  }

  async updateStatus(id: string, dto: UpdateWorkOrderStatusDto) {
    const wo = await this.prisma.workOrder.findUnique({ where: { id } });
    if (!wo) throw new NotFoundException('Work order not found');
    // Optionally check stock when completing
    if (dto.status === 'COMPLETED') {
      const product = await this.prisma.product.findUnique({ where: { id: wo.productId } });
      if (!product) throw new NotFoundException('Product not found');
      await this.prisma.product.update({ where: { id: product.id }, data: { stock: product.stock + wo.quantity } });
    }
    return this.prisma.workOrder.update({ where: { id }, data: { status: dto.status as any } });
  }
}






