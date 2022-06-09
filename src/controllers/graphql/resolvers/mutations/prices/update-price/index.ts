import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdatePriceInput } from '@/controllers/graphql/inputs/prices/update-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { UpdatePriceService } from '@/services/prices/update-price';

@Resolver(() => Price)
export class UpdatePriceResolver {
  constructor(private readonly updatePriceService: UpdatePriceService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Price)
  async updatePrice(
    @Args('input') data: UpdatePriceInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updatePriceService.execute(data);
    return response;
  }
}
