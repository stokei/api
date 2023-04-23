import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateRecurringCommand } from '@/commands/implements/recurrings/create-recurring.command';
import { IntervalType } from '@/enums/interval-type.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RecurringNotFoundException,
  RecurringPeriodForDailyPricingCannotBeLongerThan365Exception,
  RecurringPeriodForMonthlyPricingCannotBeLongerThan12Exception,
  RecurringPeriodForWeeklyPricingCannotBeLongerThan52Exception,
  RecurringPeriodForYearlyPricingCannotBeLongerThan1Exception
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
    if (!data?.app) {
      throw new ParamNotFoundException<CreateRecurringCommandKeys>('app');
    }
    if (!data?.interval) {
      throw new ParamNotFoundException<CreateRecurringCommandKeys>('interval');
    }
    if (data?.intervalCount <= 0) {
      throw new ParamNotFoundException<CreateRecurringCommandKeys>(
        'intervalCount'
      );
    }
    if (data.interval === IntervalType.DAY && data.intervalCount > 365) {
      throw new RecurringPeriodForDailyPricingCannotBeLongerThan365Exception();
    }
    if (data.interval === IntervalType.WEEK && data.intervalCount > 52) {
      throw new RecurringPeriodForWeeklyPricingCannotBeLongerThan52Exception();
    }
    if (data.interval === IntervalType.MONTH && data.intervalCount > 12) {
      throw new RecurringPeriodForMonthlyPricingCannotBeLongerThan12Exception();
    }
    if (data.interval === IntervalType.YEAR && data.intervalCount > 1) {
      throw new RecurringPeriodForYearlyPricingCannotBeLongerThan1Exception();
    }

    const recurringCreated = await this.createRecurringRepository.execute(data);
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
      usageType: cleanValue(command?.usageType),
      intervalCount: cleanValueNumber(command?.intervalCount),
      interval: cleanValue(command?.interval)
    });
  }
}
