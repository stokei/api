import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveItemFromAppSubscriptionContractCommand } from '@/commands/implements/apps/remove-item-from-app-subscription-contract.command';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  SubscriptionContractItemNotFoundException,
  SubscriptionContractItemPriceUnauthorizedRemoveException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentSubscriptionContractService } from '@/services/apps/find-app-current-subscription-contract';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { RemoveSubscriptionContractItemService } from '@/services/subscription-contract-items/remove-subscription-contract-item';
import { UpdateSubscriptionContractItemService } from '@/services/subscription-contract-items/update-subscription-contract-item';

type RemoveItemFromAppSubscriptionContractCommandKeys =
  keyof RemoveItemFromAppSubscriptionContractCommand;

@CommandHandler(RemoveItemFromAppSubscriptionContractCommand)
export class RemoveItemFromAppSubscriptionContractCommandHandler
  implements ICommandHandler<RemoveItemFromAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    RemoveItemFromAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly removeSubscriptionContractItemService: RemoveSubscriptionContractItemService,
    private readonly findAppCurrentSubscriptionContractService: FindAppCurrentSubscriptionContractService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly updateSubscriptionContractItemService: UpdateSubscriptionContractItemService
  ) {}

  async execute(
    command: RemoveItemFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<RemoveItemFromAppSubscriptionContractCommandKeys>(
          'app'
        );
      }
      if (!data?.price) {
        throw new ParamNotFoundException<RemoveItemFromAppSubscriptionContractCommandKeys>(
          'price'
        );
      }

      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }
      if (app.isStokei) {
        return;
      }
      const price = await this.findPriceByIdService.execute(data.price);
      if (!price) {
        throw new PriceNotFoundException();
      }
      if (price.isUsageBilling) {
        throw new SubscriptionContractItemPriceUnauthorizedRemoveException();
      }

      const appCurrentSubscriptionContract =
        await this.findAppCurrentSubscriptionContractService.execute(data.app);
      const subscriptionContractItems =
        await this.findAllSubscriptionContractItemsService.execute({
          where: {
            AND: {
              parent: {
                equals: appCurrentSubscriptionContract.id
              },
              app: {
                equals: app.id
              },
              price: {
                equals: price.id
              }
            }
          },
          page: {
            limit: 1
          }
        });
      const subscriptionContractItem = subscriptionContractItems?.items?.[0];
      if (!subscriptionContractItem) {
        throw new SubscriptionContractItemNotFoundException();
      }
      const isLastSubscriptionContractItem =
        subscriptionContractItem.quantity === 1;
      if (isLastSubscriptionContractItem) {
        return await this.removeSubscriptionContractItemService.execute({
          where: {
            app: app.id,
            removedBy: data.removedBy,
            isDefaultStripeAccount: true,
            subscriptionContractItem: subscriptionContractItem.id
          }
        });
      }
      const decrementSubscriptionContractItemQuantity =
        subscriptionContractItem.quantity - 1;
      return await this.updateSubscriptionContractItemService.execute({
        data: {
          quantity: decrementSubscriptionContractItemQuantity,
          updatedBy: data.removedBy
        },
        where: {
          app: app.id,
          subscriptionContractItem: subscriptionContractItem.id
        }
      });
    } catch (error) {
      this.logger.error(`App(#${data.app}) -> ` + error?.message);
      return;
    }
  }

  private clearData(
    command: RemoveItemFromAppSubscriptionContractCommand
  ): RemoveItemFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      app: cleanValue(command?.app),
      price: cleanValue(command?.price)
    });
  }
}
