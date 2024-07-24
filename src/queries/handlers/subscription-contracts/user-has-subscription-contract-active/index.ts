import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { UserHasSubscriptionContractActiveQuery } from '@/queries/implements/subscription-contracts/user-has-subscription-contract-active.query';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
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

    const customerSubscriptionContractItems =
      await this.findAllSubscriptionContractItemsService.execute({
        where: {
          AND: {
            createdBy: {
              equals: data.customer
            },
            product: {
              equals: product.externalReference
            }
          }
        }
      });
    if (!customerSubscriptionContractItems?.totalCount) {
      return false;
    }
    const subscriptionContractsIds =
      customerSubscriptionContractItems?.items?.map(({ parent }) => parent);

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
}
