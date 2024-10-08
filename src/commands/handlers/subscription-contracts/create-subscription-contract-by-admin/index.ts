import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString
} from '@stokei/nestjs';

import { CreateSubscriptionContractByAdminCommand } from '@/commands/implements/subscription-contracts/create-subscription-contract-by-admin.command';
import { CreateSubscriptionContractByAdminItemDTO } from '@/dtos/subscription-contracts/create-subscription-contract-by-admin.dto';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  RecurringNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { AppModel } from '@/models/app.model';
import { RecurringModel } from '@/models/recurring.model';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateRecurringService } from '@/services/recurrings/create-recurring';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { isValidRecurringPeriod } from '@/utils/is-valid-recurring-period';

type CreateSubscriptionContractByAdminCommandKeys =
  keyof CreateSubscriptionContractByAdminCommand;

@CommandHandler(CreateSubscriptionContractByAdminCommand)
export class CreateSubscriptionContractByAdminCommandHandler
  implements ICommandHandler<CreateSubscriptionContractByAdminCommand>
{
  constructor(
    private readonly createRecurringService: CreateRecurringService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createSubscriptionContractService: CreateSubscriptionContractService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSubscriptionContractByAdminCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSubscriptionContractByAdminCommandKeys>(
        'parent'
      );
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateSubscriptionContractByAdminCommandKeys>(
        'app'
      );
    }

    const isRecurringSubscriptionContract =
      data?.type === SubscriptionContractType.RECURRING;
    const recurringsAreValid =
      !isRecurringSubscriptionContract ||
      data.items.every(({ recurring }) =>
        isValidRecurringPeriod({
          interval: recurring.interval,
          intervalCount: recurring.intervalCount
        })
      );
    if (!recurringsAreValid) {
      throw new RecurringNotFoundException();
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new SubscriptionContractNotFoundException();
    }
    const endAt =
      isRecurringSubscriptionContract &&
      data.endAt &&
      convertToISODateString(data.endAt);
    const subscriptionContract =
      await this.createSubscriptionContractService.execute({
        parent: data.parent,
        app: data.app,
        type: data.type,
        createdByAdmin: true,
        startAt: data.startAt && convertToISODateString(data.startAt),
        endAt,
        automaticRenew: false,
        createdBy: data.createdBy
      });

    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    await this.createItems({
      app,
      subscriptionContract,
      items: data.items
    });

    const subscriptionContractModel =
      this.publisher.mergeObjectContext(subscriptionContract);
    subscriptionContractModel.createdSubscriptionContractByAdmin({
      createdBy: data.createdBy
    });
    subscriptionContractModel.commit();

    return subscriptionContract;
  }

  private async createItems({
    app,
    items,
    subscriptionContract
  }: {
    app: AppModel;
    subscriptionContract: SubscriptionContractModel;
    items: CreateSubscriptionContractByAdminItemDTO[];
  }) {
    const uniqueItems = items?.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i?.product === item?.product)
    );
    return await Promise.all(
      uniqueItems?.map(async (item) => {
        let recurring: RecurringModel;
        if (item?.recurring) {
          recurring = await this.createRecurringService.execute({
            app: app.id,
            interval: item.recurring?.interval,
            intervalCount: item.recurring?.intervalCount,
            usageType: item.recurring?.usageType,
            createdBy: subscriptionContract?.createdBy
          });
        }
        return await this.createSubscriptionContractItemService.execute({
          app: app.id,
          parent: subscriptionContract?.id,
          product: item.product,
          orderProduct: item.orderProduct,
          quantity: item.quantity,
          createdByAdmin: true,
          recurring: recurring?.id,
          createdBy: subscriptionContract?.createdBy
        });
      })
    );
  }

  private clearData(
    command: CreateSubscriptionContractByAdminCommand
  ): CreateSubscriptionContractByAdminCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      startAt: cleanValue(command?.startAt),
      endAt: cleanValue(command?.endAt),
      parent: cleanValue(command?.parent),
      type: cleanValue(command?.type),
      items: command?.items,
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
