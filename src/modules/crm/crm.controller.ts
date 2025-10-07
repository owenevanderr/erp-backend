import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('crm')
@ApiBearerAuth()
@Controller('crm')
export class CrmController {
  @Get('order-reminders')
  reminders() {
    return { reminders: [] };
  }
}



