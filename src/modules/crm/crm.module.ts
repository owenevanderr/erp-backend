import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CrmController } from './crm.controller';

@Module({
  imports: [PrismaModule],
  providers: [CustomersService],
  controllers: [CustomersController, CrmController],
})
export class CrmModule {}



