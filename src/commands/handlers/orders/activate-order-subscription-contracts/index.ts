import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { ActivateOrderSubscriptionContractsCommand } from '@/commands/implements/orders/activate-order-subscription-contracts.command';
import { ProductType } from '@/enums/product-type.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  OrderItemsNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  ProductsNotFoundException
} from '@/errors';
import { OrderItemModel } from '@/models/order-item.model';
import { PriceModel } from '@/models/price.model';
import { ProductModel } from '@/models/product.model';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { FindAllProductComboItemsService } from '@/services/product-combo-items/find-all-product-combo-items';
import { FindAllProductsService } from '@/services/products/find-all-products';
import { CreateSubscriptionContractItemService } from '@/services/subscription-contract-items/create-subscription-contract-item';
import { ActivateSubscriptionContractService } from '@/services/subscription-contracts/activate-subscription-contract';
import { CreateSubscriptionContractService } from '@/services/subscription-contracts/create-subscription-contract';

type ActivateOrderSubscriptionContractsCommandKeys =
  keyof ActivateOrderSubscriptionContractsCommand;

@CommandHandler(ActivateOrderSubscriptionContractsCommand)
export class ActivateOrderSubscriptionContractsCommandHandler
  implements ICommandHandler<ActivateOrderSubscriptionContractsCommand>
{
  private readonly logger = new Logger(
    ActivateOrderSubscriptionContractsCommandHandler.name
  );
  constructor(
    private readonly activateSubscriptionContractService: ActivateSubscriptionContractService,
    private readonly createSubscriptionContractService: CreateSubscriptionContractService,
    private readonly createSubscriptionContractItemService: CreateSubscriptionContractItemService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllProductComboItemsService: FindAllProductComboItemsService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly findAllProductsService: FindAllProductsService
  ) {}

  async execute(command: ActivateOrderSubscriptionContractsCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<ActivateOrderSubscriptionContractsCommandKeys>(
          'app'
        );
      }
      if (!data?.order) {
        throw new ParamNotFoundException<ActivateOrderSubscriptionContractsCommandKeys>(
          'order'
        );
      }

      const app = await this.findAppByIdService.execute(data.app);
      if (!app) {
        throw new AppNotFoundException();
      }
      const order = await this.findOrderByIdService.execute(data.order);
      if (!order) {
        throw new OrderNotFoundException();
      }
      const orderItems = await this.findAllOrderItemsService.execute({
        where: {
          AND: {
            parent: {
              equals: order.id
            }
          }
        }
      });
      if (!orderItems?.totalCount) {
        throw new OrderItemsNotFoundException();
      }
      const pricesIds = orderItems?.items?.map(({ price }) => price);
      const prices = await this.findAllPricesService.execute({
        where: {
          AND: {
            ids: pricesIds
          }
        }
      });
      const productsIds = orderItems?.items?.map(({ product }) => product);
      const products = await this.findAllProductsService.execute({
        where: {
          AND: {
            ids: productsIds
          }
        }
      });
      if (!products?.totalCount) {
        throw new ProductsNotFoundException();
      }

      await Promise.all(
        orderItems?.items?.map(async (orderItem) => {
          try {
            const price = prices?.items?.find(
              (currentPrice) => currentPrice?.id === orderItem.price
            );
            const product = products?.items?.find(
              (currentProduct) => currentProduct?.id === orderItem.product
            );
            const subscriptionContract =
              await this.createSubscriptionContractService.execute({
                parent: order.parent,
                app: app.id,
                order: order.id,
                automaticRenew: price.automaticRenew,
                createdByAdmin: false,
                type: price.type,
                createdBy: data.createdBy
              });

            if (product.type === ProductType.COMBO) {
              await this.createSubscriptionContractItemsFromProductCombo({
                price,
                orderItem,
                subscriptionContract,
                product,
                createdBy: data.createdBy
              });
            } else {
              await this.createSubscriptionContractItem({
                price,
                orderItem,
                subscriptionContract,
                product,
                createdBy: data.createdBy
              });
            }

            await this.activateSubscriptionContractService.execute({
              subscriptionContract: subscriptionContract.id,
              app: subscriptionContract.app,
              updatedBy: data.createdBy
            });
            return subscriptionContract;
          } catch (error) {}
        })
      );
      return;
    } catch (error) {
      this.logger.error(`Order(#${data?.order}): ${error?.message}`);
      return;
    }
  }

  private clearData(
    command: ActivateOrderSubscriptionContractsCommand
  ): ActivateOrderSubscriptionContractsCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      order: cleanValue(command?.order),
      createdBy: cleanValue(command?.createdBy)
    });
  }

  private async createSubscriptionContractItemsFromProductCombo(data: {
    product: ProductModel;
    subscriptionContract: SubscriptionContractModel;
    orderItem: OrderItemModel;
    price: PriceModel;
    createdBy: string;
  }) {
    const productComboItems =
      await this.findAllProductComboItemsService.execute({
        where: {
          AND: {
            parent: {
              equals: data.product.id
            }
          }
        }
      });
    if (!productComboItems?.totalCount) {
      return;
    }
    const productsIds = productComboItems?.items?.map(({ product }) => product);
    const products = await this.findAllProductsService.execute({
      where: {
        AND: {
          ids: productsIds
        }
      }
    });
    if (!products?.totalCount) {
      return;
    }
    return await Promise.all(
      products?.items?.map(async (productComboItem) => {
        await this.createSubscriptionContractItem({
          ...data,
          product: productComboItem
        });
      })
    );
  }

  private async createSubscriptionContractItem({
    product,
    subscriptionContract,
    orderItem,
    price,
    createdBy
  }: {
    product: ProductModel;
    subscriptionContract: SubscriptionContractModel;
    orderItem: OrderItemModel;
    price: PriceModel;
    createdBy: string;
  }) {
    return this.createSubscriptionContractItemService.execute({
      parent: subscriptionContract.id,
      app: subscriptionContract.app,
      product: product.externalReference,
      quantity: orderItem.quantity,
      createdByAdmin: false,
      price: price.id,
      recurring: price.recurring,
      createdBy
    });
  }
}
