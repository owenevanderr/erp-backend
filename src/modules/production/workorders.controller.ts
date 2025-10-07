import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WorkOrdersService } from './workorders.service';
import { CreateWorkOrderDto, UpdateWorkOrderStatusDto } from './workorders.dto';

@ApiTags('production/work-orders')
@ApiBearerAuth()
@Controller('production/work-orders')
export class WorkOrdersController {
  constructor(private readonly service: WorkOrdersService) {}

  @Post()
  create(@Body() dto: CreateWorkOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateWorkOrderStatusDto) {
    return this.service.updateStatus(id, dto);
  }
}






