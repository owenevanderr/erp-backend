import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { WorkOrdersController } from './workorders.controller';
import { WorkOrdersService } from './workorders.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
})
export class ProductionModule {}





