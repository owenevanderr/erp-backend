import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto, UpdateSupplierDto } from './suppliers.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSupplierDto) {
    return this.prisma.supplier.create({ data: dto });
  }

  findAll() {
    return this.prisma.supplier.findMany({ include: { products: true } });
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id }, include: { products: true } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  update(id: string, dto: UpdateSupplierDto) {
    return this.prisma.supplier.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    // First, delete all work orders related to products from this supplier
    await this.prisma.workOrder.deleteMany({
      where: {
        product: {
          supplierId: id
        }
      }
    });

    // Second, delete all transactions related to this supplier
    await this.prisma.transaction.deleteMany({
      where: {
        supplierId: id
      }
    });

    // Then, delete all products from this supplier
    await this.prisma.product.deleteMany({
      where: {
        supplierId: id
      }
    });

    // Finally, delete the supplier
    return this.prisma.supplier.delete({ where: { id } });
  }
}