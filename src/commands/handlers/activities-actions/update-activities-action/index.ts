import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateActivitiesActionCommand } from '@/commands/implements/activities-actions/update-activities-action.command';
import {
  ActivitiesActionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindActivitiesActionByIdRepository } from '@/repositories/activities-actions/find-activities-action-by-id';
import { UpdateActivitiesActionRepository } from '@/repositories/activities-actions/update-activities-action';

type UpdateActivitiesActionCommandKeys = keyof UpdateActivitiesActionCommand;

@CommandHandler(UpdateActivitiesActionCommand)
export class UpdateActivitiesActionCommandHandler
  implements ICommandHandler<UpdateActivitiesActionCommand>
{
  constructor(
    private readonly findActivitiesActionByIdRepository: FindActivitiesActionByIdRepository,
    private readonly updateActivitiesActionRepository: UpdateActivitiesActionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateActivitiesActionCommand) {
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

    const updated = await this.updateActivitiesActionRepository.execute({
      ...data,
      where: {
        ...data.where,
        activitiesActionId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const activitiesActionUpdated =
      await this.findActivitiesActionByIdRepository.execute(activitiesActionId);
    if (!activitiesActionUpdated) {
      throw new ActivitiesActionNotFoundException();
    }
    const activitiesActionModel = this.publisher.mergeObjectContext(
      activitiesActionUpdated
    );
    activitiesActionModel.updatedActivitiesAction();
    activitiesActionModel.commit();

    return activitiesActionUpdated;
  }

  private clearData(
    command: UpdateActivitiesActionCommand
  ): UpdateActivitiesActionCommand {
    return cleanObject({
      where: cleanObject({
        activitiesActionId: cleanValue(command?.where?.activitiesActionId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
