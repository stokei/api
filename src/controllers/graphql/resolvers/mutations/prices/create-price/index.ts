import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePriceInput } from '@/controllers/graphql/inputs/prices/create-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { CreatePriceService } from '@/services/prices/create-price';

@Resolver(() => Price)
export class CreatePriceResolver {
  constructor(private readonly createPriceService: CreatePriceService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Price)
  async createPrice(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreatePriceInput
  ) {
    const response = await this.createPriceService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
