import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { ProductModel } from '@/models/product.model';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { UserHasSubscriptionContractActiveQuery } from '@/queries/implements/subscription-contracts/user-has-subscription-contract-active.query';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindAllProductComboItemsService } from '@/services/product-combo-items/find-all-product-combo-items';
import { FindAllProductsService } from '@/services/products/find-all-products';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { FindAllSubscriptionContractsService } from '@/services/subscription-contracts/find-all-subscription-contracts';

@QueryHandler(UserHasSubscriptionContractActiveQuery)
export class UserHasSubscriptionContractActiveQueryHandler
  implements IQueryHandler<UserHasSubscriptionContractActiveQuery>
{
  constructor(
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly findAllProductsService: FindAllProductsService,
    private readonly findAllProductComboItemsService: FindAllProductComboItemsService,
    private readonly findAllSubscriptionContractsService: FindAllSubscriptionContractsService
  ) {}

  async execute(
    query: UserHasSubscriptionContractActiveQuery
  ): Promise<boolean> {
    if (!query) {
      throw new DataNotFoundException();
    }
    const data = this.clearData(query);

    const price = await this.findPriceByIdService.execute(data.price);
    if (!price?.active) {
      throw new PriceNotFoundException();
    }

    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    let customerSubscriptionContractItems: SubscriptionContractItemModel[] = [];
    if (product.isCombo) {
      customerSubscriptionContractItems =
        await this.findSubscriptionItemsWhenProductIsCombo({
          product,
          customerId: data.customer
        });
    } else {
      customerSubscriptionContractItems = await this.findSubscriptionItems({
        product,
        customerId: data.customer
      });
    }
    if (!customerSubscriptionContractItems?.length) {
      return false;
    }
    const subscriptionContractsIds = customerSubscriptionContractItems?.map(
      ({ parent }) => parent
    );

    const subscriptionContracts =
      await this.findAllSubscriptionContractsService.execute({
        where: {
          AND: {
            ids: subscriptionContractsIds,
            active: {
              equals: true
            }
          }
        }
      });
    const userHasASubscriptionActive = subscriptionContracts?.totalCount > 0;
    return userHasASubscriptionActive;
  }

  private clearData(
    query: UserHasSubscriptionContractActiveQuery
  ): UserHasSubscriptionContractActiveQuery {
    return cleanObject({
      price: cleanValue(query?.price),
      app: cleanValue(query?.app),
      customer: cleanValue(query?.customer)
    });
  }

  private async findSubscriptionItemsWhenProductIsCombo({
    product,
    customerId
  }: {
    product: ProductModel;
    customerId: string;
  }) {
    const productComboItems =
      await this.findAllProductComboItemsService.execute({
        where: {
          AND: {
            parent: {
              equals: product.id
            }
          }
        }
      });
    if (!productComboItems?.totalCount) {
      return;
    }
    const productIds = productComboItems?.items?.map(({ product }) => product);
    const products = await this.findAllProductsService.execute({
      where: {
        AND: {
          ids: productIds
        }
      }
    });
    const subscriptionItems = products?.items?.map(async (comboItem) =>
      this.findSubscriptionItems({
        customerId,
        product: comboItem
      })
    );
    return (await Promise.all(subscriptionItems))?.flat();
  }

  private async findSubscriptionItems({
    product,
    customerId
  }: {
    product: ProductModel;
    customerId: string;
  }) {
    const response = await this.findAllSubscriptionContractItemsService.execute(
      {
        where: {
          AND: {
            createdBy: {
              equals: customerId
            },
            product: {
              equals: product.externalReference
            }
          }
        }
      }
    );
    return response?.items;
  }
}
