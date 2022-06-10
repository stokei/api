import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdatePriceInput } from '@/controllers/graphql/inputs/prices/update-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { UpdatePriceService } from '@/services/prices/update-price';

@Resolver(() => Price)
export class UpdatePriceResolver {
  constructor(private readonly updatePriceService: UpdatePriceService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Price)
  async updatePrice(@Args('input') data: UpdatePriceInput) {
    const response = await this.updatePriceService.execute(data);
    return response;
  }
}
