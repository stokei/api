import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemovePriceInput } from '@/controllers/graphql/inputs/prices/remove-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { RemovePriceService } from '@/services/prices/remove-price';

@Resolver(() => Price)
export class RemovePriceResolver {
  constructor(private readonly removePriceService: RemovePriceService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Price)
  async removePrice(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: RemovePriceInput
  ) {
    const response = await this.removePriceService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
