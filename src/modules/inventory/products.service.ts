import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto });
  }

  findAll() {
    return this.prisma.product.findMany({ include: { supplier: true } });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  update(id: string, dto: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    // First, delete all work orders associated with this product
    await this.prisma.workOrder.deleteMany({ where: { productId: id } });
    
    // Then delete the product
    return this.prisma.product.delete({ where: { id } });
  }

  async adjustStock(id: string, quantity: number) {
    const product = await this.findOne(id);
    const newStock = product.stock + quantity;
    return this.prisma.product.update({ where: { id }, data: { stock: newStock } });
  }

  lowStock() {
    // Compare columns using raw SQL (Prisma does not support column-to-column comparisons in filters)
    return this.prisma.$queryRawUnsafe<any[]>(
      'SELECT * FROM "Product" WHERE "stock" < "lowStockThreshold" ORDER BY "stock" ASC',
    );
  }
}


