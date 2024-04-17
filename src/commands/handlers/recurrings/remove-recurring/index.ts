import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveRecurringCommand } from '@/commands/implements/recurrings/remove-recurring.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RecurringNotFoundException
} from '@/errors';
import { FindRecurringByIdRepository } from '@/repositories/recurrings/find-recurring-by-id';
import { RemoveRecurringRepository } from '@/repositories/recurrings/remove-recurring';

@CommandHandler(RemoveRecurringCommand)
export class RemoveRecurringCommandHandler
  implements ICommandHandler<RemoveRecurringCommand>
{
  constructor(
    private readonly findRecurringByIdRepository: FindRecurringByIdRepository,
    private readonly removeRecurringRepository: RemoveRecurringRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveRecurringCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const recurringId = splitServiceId(data.where?.recurring)?.id;
    if (!recurringId) {
      throw new ParamNotFoundException('recurringId');
    }

    const recurring =
      await this.findRecurringByIdRepository.execute(recurringId);
    if (!recurring) {
      throw new RecurringNotFoundException();
    }

    const removed = await this.removeRecurringRepository.execute({
      where: {
        ...data.where,
        recurring: recurringId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const recurringModel = this.publisher.mergeObjectContext(recurring);
    recurringModel.removedRecurring({
      removedBy: data.where.removedBy
    });
    recurringModel.commit();

    return recurring;
  }

  private clearData(command: RemoveRecurringCommand): RemoveRecurringCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        recurring: cleanValue(command?.where?.recurring)
      })
    });
  }
}
