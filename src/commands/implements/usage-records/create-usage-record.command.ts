import { ICommand } from '@nestjs/cqrs';

import { CreateUsageRecordDTO } from '@/dtos/usage-records/create-usage-record.dto';
import { UsageRecordAction } from '@/enums/usage-record-action.enum';

export class CreateUsageRecordCommand
  implements ICommand, CreateUsageRecordDTO
{
  app: string;
  parent: string;
  quantity: number;
  action: UsageRecordAction;
  createdBy: string;

  constructor(data: CreateUsageRecordDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.quantity = data.quantity;
    this.action = data.action;
    this.createdBy = data.createdBy;
  }
}
