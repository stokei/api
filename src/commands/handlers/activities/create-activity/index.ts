import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateActivityCommand } from '@/commands/implements/activities/create-activity.command';
import {
  ActivityNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateActivityRepository } from '@/repositories/activities/create-activity';

type CreateActivityCommandKeys = keyof CreateActivityCommand;

@CommandHandler(CreateActivityCommand)
export class CreateActivityCommandHandler
  implements ICommandHandler<CreateActivityCommand>
{
  constructor(
    private readonly createActivityRepository: CreateActivityRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateActivityCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateActivityCommandKeys>('parent');
    }

    const activityCreated = await this.createActivityRepository.execute(data);
    if (!activityCreated) {
      throw new ActivityNotFoundException();
    }
    const activityModel = this.publisher.mergeObjectContext(activityCreated);
    activityModel.createdActivity();
    activityModel.commit();

    return activityCreated;
  }

  private clearData(command: CreateActivityCommand): CreateActivityCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
