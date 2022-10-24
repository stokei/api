import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreateRecurringCommand } from '@/commands/implements/recurrings/create-recurring.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RecurringNotFoundException
} from '@/errors';
import { CreateRecurringRepository } from '@/repositories/recurrings/create-recurring';

type CreateRecurringCommandKeys = keyof CreateRecurringCommand;

@CommandHandler(CreateRecurringCommand)
export class CreateRecurringCommandHandler
  implements ICommandHandler<CreateRecurringCommand>
{
  constructor(
    private readonly createRecurringRepository: CreateRecurringRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateRecurringCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateRecurringCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateRecurringCommandKeys>('name');
    }
    if (!data?.file) {
      throw new ParamNotFoundException<CreateRecurringCommandKeys>('file');
    }

    const slug = cleanSlug(data.name + nanoid(8));
    const recurringCreated = await this.createRecurringRepository.execute({
      ...data,
      active: false,
      slug
    });
    if (!recurringCreated) {
      throw new RecurringNotFoundException();
    }
    const recurringModel = this.publisher.mergeObjectContext(recurringCreated);
    recurringModel.createdRecurring({
      createdBy: data.createdBy
    });
    recurringModel.commit();

    return recurringCreated;
  }

  private clearData(command: CreateRecurringCommand): CreateRecurringCommand {
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
