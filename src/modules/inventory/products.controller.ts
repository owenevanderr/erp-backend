import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, StockMovementDto, UpdateProductDto } from './products.dto';

@ApiTags('inventory/products')
@ApiBearerAuth()
@Controller('inventory/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('low-stock')
  lowStock() {
    return this.productsService.lowStock();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/stock-in')
  stockIn(@Param('id') id: string, @Body() dto: StockMovementDto) {
    return this.productsService.adjustStock(id, Math.abs(dto.quantity));
  }

  @Post(':id/stock-out')
  stockOut(@Param('id') id: string, @Body() dto: StockMovementDto) {
    return this.productsService.adjustStock(id, -Math.abs(dto.quantity));
  }
}






