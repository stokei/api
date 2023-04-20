import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { ActivatePriceInput } from '@/controllers/graphql/inputs/prices/activate-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { ActivatePriceService } from '@/services/prices/activate-price';

@Resolver(() => Price)
export class ActivatePriceResolver {
  constructor(private readonly activatePriceService: ActivatePriceService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Price)
  async activatePrice(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: ActivatePriceInput
  ) {
    const response = await this.activatePriceService.execute({
      ...data,
      updatedBy: currentAccountId
    });
    return response;
  }
}
