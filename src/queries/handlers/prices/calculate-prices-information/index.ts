import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import { CalculatePricesInformationResponse } from '@/dtos/prices/calculate-prices-information-response';
import { DataNotFoundException, PricesNotFoundException } from '@/errors';
import { PriceModel } from '@/models/price.model';
import { CalculatePricesInformationQuery } from '@/queries/implements/prices/calculate-prices-information.query';
import { FindAllPricesRepository } from '@/repositories/prices/find-all-prices';

@QueryHandler(CalculatePricesInformationQuery)
export class CalculatePricesInformationQueryHandler
  implements IQueryHandler<CalculatePricesInformationQuery>
{
  constructor(
    private readonly findAllPricesRepository: FindAllPricesRepository
  ) {}

  async execute(
    query: CalculatePricesInformationQuery
  ): Promise<CalculatePricesInformationResponse> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const priceIds = query?.prices?.map((priceId) =>
      cleanValue(splitServiceId(priceId)?.id)
    );
    if (!priceIds?.length) {
      throw new PricesNotFoundException();
    }

    const prices = await this.findAllPricesRepository.execute({
      where: {
        AND: {
          ids: priceIds
        }
      }
    });
    if (!prices?.length) {
      throw new PricesNotFoundException();
    }
    const subtotalAmount = this.calculateSubtotalAmount(prices);
    const totalAmount = this.calculateTotalAmount(prices);
    const discountAmount = this.calculateDiscountAmount(
      subtotalAmount,
      totalAmount
    );
    return {
      subtotalAmount,
      discountAmount,
      totalAmount
    };
  }

  private calculateSubtotalAmount(prices: PriceModel[]) {
    const total = prices.reduce(
      (previousAmount, currentPrice) =>
        previousAmount + currentPrice.fromAmount,
      0
    );
    if (total < 0) {
      return 0;
    }
    return total;
  }

  private calculateTotalAmount(prices: PriceModel[]) {
    const total = prices.reduce(
      (previousAmount, currentPrice) => previousAmount + currentPrice.amount,
      0
    );
    if (total < 0) {
      return 0;
    }
    return total;
  }

  private calculateDiscountAmount(subtotalAmount: number, totalAmount: number) {
    const total = subtotalAmount - totalAmount;
    if (total < 0) {
      return 0;
    }
    return total;
  }
}
