import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveActivityCommand } from '@/commands/implements/activities/remove-activity.command';
import {
  ActivityNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindActivityByIdRepository } from '@/repositories/activities/find-activity-by-id';
import { RemoveActivityRepository } from '@/repositories/activities/remove-activity';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveActivityCommandKeys = keyof RemoveActivityCommand;

@CommandHandler(RemoveActivityCommand)
export class RemoveActivityCommandHandler
  implements ICommandHandler<RemoveActivityCommand>
{
  constructor(
    private readonly findActivityByIdRepository: FindActivityByIdRepository,
    private readonly removeActivityRepository: RemoveActivityRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveActivityCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const activityId = splitServiceId(data.where?.activityId)?.id;
    if (!activityId) {
      throw new ParamNotFoundException('activityId');
    }

    const activity = await this.findActivityByIdRepository.execute(activityId);
    if (!activity) {
      throw new ActivityNotFoundException();
    }

    const removed = await this.removeActivityRepository.execute({
      where: {
        activityId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const activityModel = this.publisher.mergeObjectContext(activity);
    activityModel.removedActivity();
    activityModel.commit();

    return activity;
  }

  private clearData(command: RemoveActivityCommand): RemoveActivityCommand {
    return cleanObject({
      where: cleanObject({
        activityId: cleanValue(command?.where?.activityId)
      })
    });
  }
}
