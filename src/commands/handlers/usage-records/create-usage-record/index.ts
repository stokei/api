import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateUsageRecordCommand } from '@/commands/implements/usage-records/create-usage-record.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  UsageRecordNotFoundException
} from '@/errors';
import { CreateUsageRecordRepository } from '@/repositories/usage-records/create-usage-record';

type CreateUsageRecordCommandKeys = keyof CreateUsageRecordCommand;

@CommandHandler(CreateUsageRecordCommand)
export class CreateUsageRecordCommandHandler
  implements ICommandHandler<CreateUsageRecordCommand>
{
  constructor(
    private readonly createUsageRecordRepository: CreateUsageRecordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUsageRecordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateUsageRecordCommandKeys>('parent');
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateUsageRecordCommandKeys>('app');
    }
    if (!data?.quantity) {
      data.quantity = 1;
    }

    const usageRecordCreated = await this.createUsageRecordRepository.execute(
      data
    );
    if (!usageRecordCreated) {
      throw new UsageRecordNotFoundException();
    }
    const usageRecordModel =
      this.publisher.mergeObjectContext(usageRecordCreated);
    usageRecordModel.createdUsageRecord({
      createdBy: data.createdBy
    });
    usageRecordModel.commit();

    return usageRecordCreated;
  }

  private clearData(
    command: CreateUsageRecordCommand
  ): CreateUsageRecordCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      quantity: cleanValueNumber(command?.quantity),
      action: cleanValue(command?.action)
    });
  }
}
