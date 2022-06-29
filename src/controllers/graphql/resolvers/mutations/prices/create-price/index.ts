import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreatePriceInput } from '@/controllers/graphql/inputs/prices/create-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { CreatePriceService } from '@/services/prices/create-price';

@Resolver(() => Price)
export class CreatePriceResolver {
  constructor(private readonly createPriceService: CreatePriceService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Price)
  async createPrice(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreatePriceInput
  ) {
    const response = await this.createPriceService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
