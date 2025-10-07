import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { HealthController } from './health.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { ProductionModule } from './modules/production/production.module';
import { CrmModule } from './modules/crm/crm.module';
import { HrmModule } from './modules/hrm/hrm.module';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AccountingModule } from 'modules/accounting/accounting.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    InventoryModule,
    ProductionModule,
    CrmModule,
    HrmModule,
    AccountingModule,
    DashboardModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}


