import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { AddItemToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-item-to-app-subscription-contract.command';
import { PriceType } from '@/enums/price-type.enum';
import { UsageRecordAction } from '@/enums/usage-record-action.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentSubscriptionContractService } from '@/services/apps/find-app-current-subscription-contract';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeSubscriptionService } from '@/services/stripe/create-stripe-subscription';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { UpdateSubscriptionContractItemService } from '@/services/subscription-contract-items/update-subscription-contract-item';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { CreateUsageRecordService } from '@/services/usage-records/create-usage-record';

type AddItemToAppSubscriptionContractCommandKeys =
  keyof AddItemToAppSubscriptionContractCommand;

@CommandHandler(AddItemToAppSubscriptionContractCommand)
export class AddItemToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddItemToAppSubscriptionContractCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createSubscriptionContractService: CreateSubscriptionContractService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly createStripeSubscriptionService: CreateStripeSubscriptionService,
    private readonly createUsageRecordService: CreateUsageRecordService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findAppCurrentSubscriptionContractService: FindAppCurrentSubscriptionContractService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly updateSubscriptionContractItemService: UpdateSubscriptionContractItemService
  ) {}

  async execute(
    command: AddItemToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<AddItemToAppSubscriptionContractCommandKeys>(
        'app'
      );
    }
    if (!data?.price) {
      throw new ParamNotFoundException<AddItemToAppSubscriptionContractCommandKeys>(
        'price'
      );
    }
    if (data?.quantity < 1) {
      throw new ParamNotFoundException<AddItemToAppSubscriptionContractCommandKeys>(
        'quantity'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const price = await this.findPriceByIdService.execute(data.price);
    if (!price) {
      throw new PriceNotFoundException();
    }

    let appCurrentSubscriptionContract: SubscriptionContractModel;
    let subscriptionContractItem: SubscriptionContractItemModel;
    try {
      appCurrentSubscriptionContract =
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
      if (subscriptionContractItems?.totalCount > 0) {
        subscriptionContractItem = subscriptionContractItems.items[0];
      }
    } catch (error) {
      const stripeSubscription =
        await this.createStripeSubscriptionService.execute({
          app: app.id,
          currency: app.currency,
          customer: app.stripeCustomer,
          prices: [
            {
              price: price.stripePrice,
              quantity: 1
            }
          ]
        });
      appCurrentSubscriptionContract =
        await this.createSubscriptionContractService.execute({
          app: app.id,
          automaticRenew: true,
          createdBy: data.createdBy,
          parent: app.id,
          stripeSubscription: stripeSubscription.id,
          type: PriceType.RECURRING
        });
    }

    if (!subscriptionContractItem) {
      const product = await this.findProductByIdService.execute(price.parent);
      subscriptionContractItem =
        await this.createSubscriptionContractItemService.execute({
          app: app.id,
          parent: appCurrentSubscriptionContract.id,
          price: price.id,
          product: product.parent,
          quantity: 1,
          recurring: null,
          createdBy: data.createdBy
        });
    } else if (!price.isUsageBilling) {
      const incrementedSubscriptionContractItemQuantity =
        subscriptionContractItem.quantity + data.quantity;
      subscriptionContractItem =
        await this.updateSubscriptionContractItemService.execute({
          data: {
            quantity: incrementedSubscriptionContractItemQuantity,
            updatedBy: data.createdBy
          },
          where: {
            app: app.id,
            subscriptionContractItem: subscriptionContractItem.id
          }
        });
    }
    if (price.isUsageBilling) {
      await this.createUsageRecordService.execute({
        action: UsageRecordAction.INCREMENT,
        app: app.id,
        createdBy: data.createdBy,
        parent: subscriptionContractItem.id,
        quantity: data.quantity
      });
    }
    return subscriptionContractItem;
  }

  private clearData(
    command: AddItemToAppSubscriptionContractCommand
  ): AddItemToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      quantity: cleanValueNumber(command?.quantity),
      price: cleanValue(command?.price)
    });
  }
}
