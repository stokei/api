import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdatePriceInput } from '@/controllers/graphql/inputs/prices/update-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { UpdatePriceService } from '@/services/prices/update-price';

@Resolver(() => Price)
export class UpdatePriceResolver {
  constructor(private readonly updatePriceService: UpdatePriceService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Price)
  async updatePrice(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdatePriceInput
  ) {
    const response = await this.updatePriceService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
