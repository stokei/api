import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { DeactivatePriceInput } from '@/controllers/graphql/inputs/prices/deactivate-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { DeactivatePriceService } from '@/services/prices/deactivate-price';

@Resolver(() => Price)
export class DeactivatePriceResolver {
  constructor(
    private readonly deactivatePriceService: DeactivatePriceService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Price)
  async deactivatePrice(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: DeactivatePriceInput
  ) {
    const response = await this.deactivatePriceService.execute({
      ...data,
      updatedBy: currentAccountId
    });
    return response;
  }
}
