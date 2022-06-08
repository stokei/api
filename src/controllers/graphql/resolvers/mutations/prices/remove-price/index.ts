import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemovePriceInput } from '@/controllers/graphql/inputs/prices/remove-price.input';
import { Price } from '@/controllers/graphql/types/price';
import { RemovePriceService } from '@/services/prices/remove-price';

@Resolver(() => Price)
export class RemovePriceResolver {
  constructor(private readonly removePriceService: RemovePriceService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Price)
  async removePrice(
    @Args('input') data: RemovePriceInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removePriceService.execute(data);
    return response;
  }
}
