import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateActivityCommand } from '@/commands/implements/activities/update-activity.command';
import {
  ActivityNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindActivityByIdRepository } from '@/repositories/activities/find-activity-by-id';
import { UpdateActivityRepository } from '@/repositories/activities/update-activity';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateActivityCommandKeys = keyof UpdateActivityCommand;

@CommandHandler(UpdateActivityCommand)
export class UpdateActivityCommandHandler
  implements ICommandHandler<UpdateActivityCommand>
{
  constructor(
    private readonly findActivityByIdRepository: FindActivityByIdRepository,
    private readonly updateActivityRepository: UpdateActivityRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateActivityCommand) {
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

    const updated = await this.updateActivityRepository.execute({
      ...data,
      where: {
        ...data.where,
        activityId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const activityUpdated = await this.findActivityByIdRepository.execute(
      activityId
    );
    if (!activityUpdated) {
      throw new ActivityNotFoundException();
    }
    const activityModel = this.publisher.mergeObjectContext(activityUpdated);
    activityModel.updatedActivity();
    activityModel.commit();

    return activityUpdated;
  }

  private clearData(command: UpdateActivityCommand): UpdateActivityCommand {
    return cleanObject({
      where: cleanObject({
        activityId: cleanValue(command?.where?.activityId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
