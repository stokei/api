import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateUsageRecordCommand } from '@/commands/implements/usage-records/update-usage-record.command';
import { UpdateUsageRecordDTO } from '@/dtos/usage-records/update-usage-record.dto';
import { UsageRecordModel } from '@/models/usage-record.model';

@Injectable()
export class UpdateUsageRecordService
  implements IBaseService<UpdateUsageRecordDTO, Promise<UsageRecordModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateUsageRecordDTO): Promise<UsageRecordModel> {
    return await this.commandBus.execute(new UpdateUsageRecordCommand(data));
  }
}
