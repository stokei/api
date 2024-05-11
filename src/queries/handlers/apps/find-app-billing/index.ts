import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';
import dayjs from 'dayjs';

import { DataNotFoundException } from '@/errors';
import { BillingModel } from '@/models/billing.model';
import { BillingItemModel } from '@/models/billing-item.model';
import { FindAppBillingQuery } from '@/queries/implements/apps/find-app-billing.query';
import { FindAppCurrentSubscriptionContractService } from '@/services/apps/find-app-current-subscription-contract';
import { FindAllPriceTiersService } from '@/services/price-tiers/find-all-price-tiers';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { SumUsageRecordByParentService } from '@/services/usage-records/sum-usage-record-by-parent';

const emptyBilling = new BillingModel({
  items: [],
  total: 0
});

@QueryHandler(FindAppBillingQuery)
export class FindAppBillingQueryHandler
  implements IQueryHandler<FindAppBillingQuery>
{
  constructor(
    private readonly findAppCurrentSubscriptionContractService: FindAppCurrentSubscriptionContractService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly findAllPriceTiersService: FindAllPriceTiersService,
    private readonly sumUsageRecordByParentService: SumUsageRecordByParentService
  ) {}

  async execute(query: FindAppBillingQuery): Promise<BillingModel> {
    try {
      if (!query) {
        throw new DataNotFoundException();
      }

      const appId = cleanValue(query.app);
      if (!appId) {
        return emptyBilling;
      }

      const currentAppSubscriptionContract =
        await this.findAppCurrentSubscriptionContractService.execute(appId);
      if (!currentAppSubscriptionContract) {
        return emptyBilling;
      }

      const subscriptionContractItems =
        await this.findAllSubscriptionContractItemsService.execute({
          where: {
            AND: {
              parent: {
                equals: currentAppSubscriptionContract.id
              }
            }
          }
        });
      if (!subscriptionContractItems?.totalCount) {
        return emptyBilling;
      }

      const pricesIds = subscriptionContractItems?.items?.map(
        ({ price }) => price
      );
      if (!pricesIds?.length) {
        return emptyBilling;
      }
      const prices = await this.findAllPricesService.execute({
        where: {
          AND: {
            ids: pricesIds
          }
        }
      });
      if (!prices?.totalCount) {
        return emptyBilling;
      }

      let billingTotal = 0;
      const currency = prices?.items?.[0]?.currency;
      const items: BillingItemModel[] = (
        await Promise.all(
          subscriptionContractItems?.items?.map(
            async (subscriptionContractItem) => {
              const price = prices?.items?.find(
                (currentPrice) =>
                  subscriptionContractItem?.price === currentPrice.id
              );
              if (!price) {
                return;
              }
              let quantity = subscriptionContractItem?.quantity;
              let amount = price.amount;
              if (price?.isUsageBilling) {
                quantity = await this.sumUsageRecordByParentService.execute(
                  subscriptionContractItem.id
                );
                const priceTiers = await this.findAllPriceTiersService.execute({
                  where: {
                    AND: {
                      parent: {
                        equals: price.id
                      }
                    }
                  },
                  page: {
                    limit: 1
                  }
                });
                amount = priceTiers?.items?.[0]?.amount || 0;
              }
              const total = Math.round(quantity * amount);
              billingTotal += total;
              return new BillingItemModel({
                price: price?.id,
                quantity,
                total,
                unitAmount: amount
              });
            }
          )
        )
      )?.filter(Boolean);

      // const now = dayjs(Date.now());
      // const monthDays = now.daysInMonth();
      // const percentageMonthComplete = now.date() / monthDays;
      // billingTotal =
      //   billingTotal > 0
      //     ? Math.round(billingTotal * percentageMonthComplete)
      //     : 0;
      return new BillingModel({
        currency,
        total: billingTotal,
        items
      });
    } catch (error) {
      return emptyBilling;
    }
  }
}
