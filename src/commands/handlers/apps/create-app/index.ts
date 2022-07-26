import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateAppCommand } from '@/commands/implements/apps/create-app.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAppRepository } from '@/repositories/apps/create-app';

type CreateAppCommandKeys = keyof CreateAppCommand;

@CommandHandler(CreateAppCommand)
export class CreateAppCommandHandler
  implements ICommandHandler<CreateAppCommand>
{
  constructor(
    private readonly createAppRepository: CreateAppRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAppCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateAppCommandKeys>('parent');
    }

    const appCreated = await this.createAppRepository.execute(data);
    if (!appCreated) {
      throw new AppNotFoundException();
    }
    const appModel = this.publisher.mergeObjectContext(appCreated);
    appModel.createdApp({
      createdBy: data.createdBy
    });
    appModel.commit();

    return appCreated;
  }

  private clearData(command: CreateAppCommand): CreateAppCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
