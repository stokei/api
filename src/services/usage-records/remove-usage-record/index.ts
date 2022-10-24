import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveUsageRecordCommand } from '@/commands/implements/usage-records/remove-usage-record.command';
import { RemoveUsageRecordDTO } from '@/dtos/usage-records/remove-usage-record.dto';
import { UsageRecordModel } from '@/models/usage-record.model';

@Injectable()
export class RemoveUsageRecordService
  implements IBaseService<RemoveUsageRecordDTO, Promise<UsageRecordModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveUsageRecordDTO): Promise<UsageRecordModel> {
    return await this.commandBus.execute(new RemoveUsageRecordCommand(data));
  }
}
