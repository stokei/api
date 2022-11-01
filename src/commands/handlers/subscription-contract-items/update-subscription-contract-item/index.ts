import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueNumber,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/update-subscription-contract-item.command';
import { BillingScheme } from '@/enums/billing-scheme.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  SubscriptionContractItemNotFoundException,
  SubscriptionContractItemPriceUnauthorizedUpdateException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { UpdateSubscriptionContractItemRepository } from '@/repositories/subscription-contract-items/update-subscription-contract-item';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { UpdateStripeSubscriptionItemService } from '@/services/stripe/update-stripe-subscription-item';
import { FindSubscriptionContractItemByIdService } from '@/services/subscription-contract-items/find-subscription-contract-item-by-id';

@CommandHandler(UpdateSubscriptionContractItemCommand)
export class UpdateSubscriptionContractItemCommandHandler
  implements ICommandHandler<UpdateSubscriptionContractItemCommand>
{
  constructor(
    private readonly findSubscriptionContractItemByIdService: FindSubscriptionContractItemByIdService,
    private readonly updateSubscriptionContractItemRepository: UpdateSubscriptionContractItemRepository,
    private readonly updateStripeSubscriptionItemService: UpdateStripeSubscriptionItemService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSubscriptionContractItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const subscriptionContractItemId = splitServiceId(
      data.where?.subscriptionContractItem
    )?.id;
    if (!subscriptionContractItemId) {
      throw new ParamNotFoundException('subscriptionContractItemId');
    }

    const subscriptionContractItem =
      await this.findSubscriptionContractItemByIdService.execute(
        data.where?.subscriptionContractItem
      );
    if (!subscriptionContractItem) {
      throw new SubscriptionContractItemNotFoundException();
    }
    const app = await this.findAppByIdService.execute(data.where.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const price = await this.findPriceByIdService.execute(
      subscriptionContractItem.price
    );
    if (!price) {
      throw new PriceNotFoundException();
    }
    if (price.billingScheme === BillingScheme.TIERED) {
      throw new SubscriptionContractItemPriceUnauthorizedUpdateException();
    }
    const dataUpdated = data.data;

    const stripeSubscriptionItemUpdated =
      await this.updateStripeSubscriptionItemService.execute({
        data: {
          quantity: dataUpdated.quantity
        },
        where: {
          stripeAccount: app.stripeAccount,
          stripeSubscriptionItem:
            subscriptionContractItem.stripeSubscriptionItem
        }
      });
    if (!stripeSubscriptionItemUpdated) {
      throw new DataNotFoundException();
    }

    const updated = await this.updateSubscriptionContractItemRepository.execute(
      {
        data: dataUpdated,
        where: {
          ...data.where,
          subscriptionContractItem: subscriptionContractItemId
        }
      }
    );
    if (!updated) {
      throw new DataNotFoundException();
    }

    const subscriptionContractItemUpdated = new SubscriptionContractItemModel({
      ...subscriptionContractItem,
      ...dataUpdated
    });
    const subscriptionContractItemModel = this.publisher.mergeObjectContext(
      subscriptionContractItemUpdated
    );
    subscriptionContractItemModel.updatedSubscriptionContractItem({
      updatedBy: data.data.updatedBy
    });
    subscriptionContractItemModel.commit();

    return subscriptionContractItemUpdated;
  }

  private clearData(
    command: UpdateSubscriptionContractItemCommand
  ): UpdateSubscriptionContractItemCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        subscriptionContractItem: cleanValue(
          command?.where?.subscriptionContractItem
        )
      }),
      data: cleanObject({
        quantity: cleanValueNumber(command?.data?.quantity),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
