import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateActivitiesActionCommand } from '@/commands/implements/activities-actions/create-activities-action.command';
import {
  ActivitiesActionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateActivitiesActionRepository } from '@/repositories/activities-actions/create-activities-action';

type CreateActivitiesActionCommandKeys = keyof CreateActivitiesActionCommand;

@CommandHandler(CreateActivitiesActionCommand)
export class CreateActivitiesActionCommandHandler
  implements ICommandHandler<CreateActivitiesActionCommand>
{
  constructor(
    private readonly createActivitiesActionRepository: CreateActivitiesActionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateActivitiesActionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateActivitiesActionCommandKeys>(
        'parent'
      );
    }

    const activitiesActionCreated =
      await this.createActivitiesActionRepository.execute(data);
    if (!activitiesActionCreated) {
      throw new ActivitiesActionNotFoundException();
    }
    const activitiesActionModel = this.publisher.mergeObjectContext(
      activitiesActionCreated
    );
    activitiesActionModel.createdActivitiesAction();
    activitiesActionModel.commit();

    return activitiesActionCreated;
  }

  private clearData(
    command: CreateActivitiesActionCommand
  ): CreateActivitiesActionCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
