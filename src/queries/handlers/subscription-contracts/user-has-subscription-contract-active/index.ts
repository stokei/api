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
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

@QueryHandler(UserHasSubscriptionContractActiveQuery)
export class UserHasSubscriptionContractActiveQueryHandler
  implements IQueryHandler<UserHasSubscriptionContractActiveQuery>
{
  constructor(
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService
  ) {}

  async execute(
    query: UserHasSubscriptionContractActiveQuery
  ): Promise<boolean> {
    if (!query) {
      throw new DataNotFoundException();
    }
    const data = this.clearData(query);

    const product = await this.findProductByIdService.execute(data.product);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const price = await this.findPriceByIdService.execute(data.price);
    if (!price?.active) {
      throw new PriceNotFoundException();
    }

    const customerSubscriptionContractItems =
      await this.findAllSubscriptionContractItemsService.execute({
        where: {
          AND: {
            createdBy: {
              equals: data.customer
            },
            product: {
              equals: product.parent
            },
            price: {
              equals: price.id
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

    if (customerSubscriptionContractItems?.totalCount > 0) {
      const subscriptionContracts = await Promise.all(
        customerSubscriptionContractItems?.items?.map(
          async (customerSubscriptionContractItem) => {
            try {
              const customerSubscriptionContract =
                await this.findSubscriptionContractByIdService.execute(
                  customerSubscriptionContractItem?.parent
                );
              return customerSubscriptionContract;
            } catch (error) {
              return null;
            }
          }
        )
      );
      return subscriptionContracts
        ?.filter(Boolean)
        ?.some((subscriptionContract) => !!subscriptionContract.active);
    }
    return false;
  }

  private clearData(
    query: UserHasSubscriptionContractActiveQuery
  ): UserHasSubscriptionContractActiveQuery {
    return cleanObject({
      price: cleanValue(query?.price),
      product: cleanValue(query?.product),
      app: cleanValue(query?.app),
      customer: cleanValue(query?.customer)
    });
  }
}
