import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreatePriceInput } from '@/controllers/graphql/inputs/prices/create-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { CreatePriceService } from '@/services/prices/create-price';

@Resolver(() => Price)
export class CreatePriceResolver {
  constructor(private readonly createPriceService: CreatePriceService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Price)
  async createPrice(
    @Args('input') data: CreatePriceInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createPriceService.execute(data);
    return response;
  }
}
