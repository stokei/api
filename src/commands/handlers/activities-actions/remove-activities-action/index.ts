import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveActivitiesActionCommand } from '@/commands/implements/activities-actions/remove-activities-action.command';
import {
  ActivitiesActionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindActivitiesActionByIdRepository } from '@/repositories/activities-actions/find-activities-action-by-id';
import { RemoveActivitiesActionRepository } from '@/repositories/activities-actions/remove-activities-action';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveActivitiesActionCommandKeys = keyof RemoveActivitiesActionCommand;

@CommandHandler(RemoveActivitiesActionCommand)
export class RemoveActivitiesActionCommandHandler
  implements ICommandHandler<RemoveActivitiesActionCommand>
{
  constructor(
    private readonly findActivitiesActionByIdRepository: FindActivitiesActionByIdRepository,
    private readonly removeActivitiesActionRepository: RemoveActivitiesActionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveActivitiesActionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const activitiesActionId = splitServiceId(
      data.where?.activitiesActionId
    )?.id;
    if (!activitiesActionId) {
      throw new ParamNotFoundException('activitiesActionId');
    }

    const activitiesAction =
      await this.findActivitiesActionByIdRepository.execute(activitiesActionId);
    if (!activitiesAction) {
      throw new ActivitiesActionNotFoundException();
    }

    const removed = await this.removeActivitiesActionRepository.execute({
      where: {
        activitiesActionId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const activitiesActionModel =
      this.publisher.mergeObjectContext(activitiesAction);
    activitiesActionModel.removedActivitiesAction();
    activitiesActionModel.commit();

    return activitiesAction;
  }

  private clearData(
    command: RemoveActivitiesActionCommand
  ): RemoveActivitiesActionCommand {
    return cleanObject({
      where: cleanObject({
        activitiesActionId: cleanValue(command?.where?.activitiesActionId)
      })
    });
  }
}
