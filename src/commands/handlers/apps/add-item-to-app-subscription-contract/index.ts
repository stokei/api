import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  addMonths,
  cleanObject,
  cleanValue,
  cleanValueNumber,
  convertToISODateString
} from '@stokei/nestjs';

import { AddItemToAppSubscriptionContractCommand } from '@/commands/implements/apps/add-item-to-app-subscription-contract.command';
import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';
import { UsageRecordAction } from '@/enums/usage-record-action.enum';
import {
  AppNotFoundException,
  AppUnauthorizedException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { AppModel } from '@/models/app.model';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { PriceModel } from '@/models/price.model';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentSubscriptionContractService } from '@/services/apps/find-app-current-subscription-contract';
import { FindPaymentMethodByIdService } from '@/services/payment-methods/find-payment-method-by-id';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { CreateStripeSubscriptionService } from '@/services/stripe/create-stripe-subscription';
import { FindStripeSubscriptionByIdService } from '@/services/stripe/find-subscription-by-id';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { UpdateSubscriptionContractItemService } from '@/services/subscription-contract-items/update-subscription-contract-item';
import { ActivateSubscriptionContractService } from '@/services/subscription-contracts/activate-subscription-contract';
import { CancelSubscriptionContractService } from '@/services/subscription-contracts/cancel-subscription-contract';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';
import { CreateUsageRecordService } from '@/services/usage-records/create-usage-record';

type AddItemToAppSubscriptionContractCommandKeys =
  keyof AddItemToAppSubscriptionContractCommand;

@CommandHandler(AddItemToAppSubscriptionContractCommand)
export class AddItemToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddItemToAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    AddItemToAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createSubscriptionContractService: CreateSubscriptionContractService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly createStripeSubscriptionService: CreateStripeSubscriptionService,
    private readonly createUsageRecordService: CreateUsageRecordService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly activateSubscriptionContractService: ActivateSubscriptionContractService,
    private readonly cancelSubscriptionContractService: CancelSubscriptionContractService,
    private readonly findAppCurrentSubscriptionContractService: FindAppCurrentSubscriptionContractService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly findPaymentMethodByIdService: FindPaymentMethodByIdService,
    private readonly findStripeSubscriptionByIdService: FindStripeSubscriptionByIdService,
    private readonly updateSubscriptionContractItemService: UpdateSubscriptionContractItemService
  ) {}

  async execute(
    command: AddItemToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
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
      if (data?.quantity <= 0) {
        throw new ParamNotFoundException<AddItemToAppSubscriptionContractCommandKeys>(
          'quantity'
        );
      }

      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }
      if (!app.isAllowedToUsePlan) {
        throw new AppUnauthorizedException();
      }
      if (app.isStokei) {
        return;
      }
      const price = await this.findPriceByIdService.execute(data.price);
      if (!price) {
        throw new PriceNotFoundException();
      }

      const {
        subscriptionContract: appCurrentSubscriptionContract,
        stripeSubscriptionContractItemId
      } = await this.findOrCreateSubscription({
        app,
        price,
        quantity: data?.quantity,
        createdBy: data.createdBy
      });
      const subscriptionContractItem = await this.findOrCreateSubscriptionItem({
        app,
        price,
        stripeSubscriptionContractItemId,
        appCurrentSubscriptionContract,
        quantity: data?.quantity,
        createdBy: data.createdBy
      });

      if (price.isUsageBilling) {
        await this.createUsageRecordService.execute({
          action: UsageRecordAction.INCREMENT,
          app: app.id,
          createdBy: data.createdBy,
          parent: subscriptionContractItem.id,
          quantity: data.quantity
        });
        return subscriptionContractItem;
      }

      const incrementedSubscriptionContractItemQuantity =
        subscriptionContractItem.quantity + data.quantity;
      return this.updateSubscriptionContractItemService.execute({
        data: {
          quantity: incrementedSubscriptionContractItemQuantity,
          updatedBy: data.createdBy
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
    command: AddItemToAppSubscriptionContractCommand
  ): AddItemToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      quantity: cleanValueNumber(command?.quantity),
      price: cleanValue(command?.price)
    });
  }

  async findOrCreateSubscription({
    createdBy,
    app,
    price,
    quantity
  }: {
    createdBy: string;
    quantity: number;
    app: AppModel;
    price: PriceModel;
  }) {
    try {
      const subscriptionContract =
        await this.findAppCurrentSubscriptionContractService.execute(app.id);

      const stripeSubscription =
        await this.findStripeSubscriptionByIdService.execute(
          subscriptionContract.stripeSubscription
        );
      const isInactiveSubscription =
        stripeSubscription?.status !== 'active' ||
        subscriptionContract.status !== SubscriptionContractStatus.ACTIVE;

      if (isInactiveSubscription) {
        const isCanceledSubscription =
          subscriptionContract.status === SubscriptionContractStatus.CANCELED;
        if (!isCanceledSubscription) {
          await this.cancelSubscriptionContractService.execute({
            subscriptionContract: subscriptionContract.id,
            app: subscriptionContract.app,
            updatedBy: createdBy
          });
        }

        throw new SubscriptionContractNotFoundException();
      }
      return { subscriptionContract };
    } catch (error) {
      let appPaymentMethod: PaymentMethodModel;
      try {
        appPaymentMethod = await this.findPaymentMethodByIdService.execute(
          app.paymentMethod
        );
      } catch (error) {}
      const appOwner = await this.findAccountByIdService.execute(app.parent);
      const stripeSubscription =
        await this.createStripeSubscriptionService.execute({
          app: app.id,
          currency: app.currency,
          customer: appOwner.stripeCustomer,
          paymentMethod: appPaymentMethod?.stripePaymentMethod,
          startPaymentWhenSubscriptionIsCreated: false,
          automaticRenew: true,
          prices: [
            {
              price: price.stripePrice,
              ...(!price.isUsageBilling && { quantity })
            }
          ]
        });
      const subscriptionCreated =
        await this.createSubscriptionContractService.execute({
          app: app.id,
          automaticRenew: true,
          createdBy,
          parent: app.id,
          stripeSubscription: stripeSubscription.id,
          type: price.type,
          createdByAdmin: false
        });
      const startAt = convertToISODateString(Date.now());
      const subscriptionContract =
        await this.activateSubscriptionContractService.execute({
          app: app.id,
          paymentMethod: app.paymentMethod,
          subscriptionContract: subscriptionCreated.id,
          startAt,
          endAt: convertToISODateString(addMonths(1, startAt)),
          updatedBy: createdBy
        });
      return {
        subscriptionContract,
        stripeSubscriptionContractItemId: stripeSubscription.items.data[0].id
      };
    }
  }

  async findOrCreateSubscriptionItem({
    appCurrentSubscriptionContract,
    stripeSubscriptionContractItemId,
    createdBy,
    app,
    quantity,
    price
  }: {
    appCurrentSubscriptionContract: SubscriptionContractModel;
    stripeSubscriptionContractItemId?: string;
    createdBy: string;
    quantity: number;
    app: AppModel;
    price: PriceModel;
  }) {
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
      return subscriptionContractItems.items[0];
    }
    const product = await this.findProductByIdService.execute(price.parent);
    const existsStripeSubscriptionItem = !!stripeSubscriptionContractItemId;
    if (!existsStripeSubscriptionItem) {
      const stripeSubscription =
        await this.findStripeSubscriptionByIdService.execute(
          appCurrentSubscriptionContract.stripeSubscription
        );
      if (stripeSubscription) {
        const stripeSubscriptionContractItem =
          stripeSubscription.items.data.find(
            (subscriptionItem) =>
              subscriptionItem.price?.id === price.stripePrice
          );
        stripeSubscriptionContractItemId = stripeSubscriptionContractItem?.id;
      }
    }
    return await this.createSubscriptionContractItemService.execute({
      app: app.id,
      stripeSubscriptionItem: stripeSubscriptionContractItemId,
      parent: appCurrentSubscriptionContract.id,
      price: price.id,
      product: product.parent,
      quantity,
      recurring: null,
      createdBy,
      createdByAdmin: false,
      isDefaultStripeAccount: true
    });
  }
}
