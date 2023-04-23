import { ICommand } from '@nestjs/cqrs';

import { CreateRecurringDTO } from '@/dtos/recurrings/create-recurring.dto';
import { IntervalType } from '@/enums/interval-type.enum';
import { UsageType } from '@/enums/usage-type.enum';

export class CreateRecurringCommand implements ICommand, CreateRecurringDTO {
  app: string;
  usageType: UsageType;
  intervalCount: number;
  interval: IntervalType;
  createdBy: string;

  constructor(data: CreateRecurringDTO) {
    this.app = data.app;
    this.usageType = data.usageType;
    this.intervalCount = data.intervalCount;
    this.interval = data.interval;
    this.createdBy = data.createdBy;
  }
}
