import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateUsageRecordCommand } from '@/commands/implements/usage-records/create-usage-record.command';
import { CreateUsageRecordDTO } from '@/dtos/usage-records/create-usage-record.dto';
import { UsageRecordModel } from '@/models/usage-record.model';

@Injectable()
export class CreateUsageRecordService
  implements IBaseService<CreateUsageRecordDTO, Promise<UsageRecordModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateUsageRecordDTO): Promise<UsageRecordModel> {
    return await this.commandBus.execute(new CreateUsageRecordCommand(data));
  }
}
