import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
    if (!data?.name) {
      throw new ParamNotFoundException<CreateUsageRecordCommandKeys>('name');
    }
    if (!data?.file) {
      throw new ParamNotFoundException<CreateUsageRecordCommandKeys>('file');
    }

    const slug = cleanSlug(data.name + nanoid(8));
    const usageRecordCreated = await this.createUsageRecordRepository.execute({
      ...data,
      active: false,
      slug
    });
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
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      file: cleanValue(command?.file),
      poster: cleanValue(command?.poster),
      parent: cleanValue(command?.parent)
    });
  }
}
