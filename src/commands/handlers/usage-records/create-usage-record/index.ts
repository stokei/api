import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateUsageRecordCommand } from '@/commands/implements/usage-records/create-usage-record.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractItemNotFoundException,
  UsageRecordNotFoundException
} from '@/errors';
import { UsageRecordMapper } from '@/mappers/usage-records';
import { CreateUsageRecordRepository } from '@/repositories/usage-records/create-usage-record';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateStripeUsageRecordService } from '@/services/stripe/create-stripe-usage-record';
import { FindSubscriptionContractItemByIdService } from '@/services/subscription-contract-items/find-subscription-contract-item-by-id';

type CreateUsageRecordCommandKeys = keyof CreateUsageRecordCommand;

@CommandHandler(CreateUsageRecordCommand)
export class CreateUsageRecordCommandHandler
  implements ICommandHandler<CreateUsageRecordCommand>
{
  constructor(
    private readonly createUsageRecordRepository: CreateUsageRecordRepository,
    private readonly createStripeUsageRecordService: CreateStripeUsageRecordService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findSubscriptionContractItemByIdService: FindSubscriptionContractItemByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUsageRecordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateUsageRecordCommandKeys>('parent');
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateUsageRecordCommandKeys>('app');
    }
    if (data?.quantity < 1) {
      data.quantity = 1;
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const subscriptionContractItem =
      await this.findSubscriptionContractItemByIdService.execute(data.parent);
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }
    if (subscriptionContractItem.stripeSubscriptionItem) {
      await this.createStripeUsageRecordService.execute({
        quantity: data.quantity,
        action: new UsageRecordMapper().actionToStripeAction(data.action),
        subscriptionItem: subscriptionContractItem.stripeSubscriptionItem,
        stripeAccount: app.stripeAccount
      });
    }

    const usageRecordCreated =
      await this.createUsageRecordRepository.execute(data);
    if (!usageRecordCreated) {
      throw new UsageRecordNotFoundException();
    }
    const usageRecordModel =
      this.publisher.mergeObjectContext(usageRecordCreated);
    usageRecordModel.createdUsageRecord({
      createdBy: data.createdBy
    });
    usageRecordModel.commit();

    return usageRecordCreated;
  }

  private clearData(
    command: CreateUsageRecordCommand
  ): CreateUsageRecordCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      quantity: cleanValueNumber(command?.quantity),
      action: cleanValue(command?.action)
    });
  }
}
