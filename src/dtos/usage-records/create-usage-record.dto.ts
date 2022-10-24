import { UsageRecordAction } from '@/enums/usage-record-action.enum';

export class CreateUsageRecordDTO {
  app: string;
  parent: string;
  quantity: number;
  action: UsageRecordAction;
  createdBy: string;
}
