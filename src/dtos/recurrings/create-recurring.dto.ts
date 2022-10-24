import { IntervalType } from '@/enums/interval-type.enum';
import { UsageType } from '@/enums/usage-type.enum';

export class CreateRecurringDTO {
  app: string;
  usageType: UsageType;
  intervalCount: number;
  interval: IntervalType;
  createdBy: string;
}
