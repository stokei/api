import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCheckoutInput } from '@/controllers/graphql/inputs/checkouts/remove-checkout.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { RemoveCheckoutService } from '@/services/checkouts/remove-checkout';

@Resolver(() => Checkout)
export class RemoveCheckoutResolver {
  constructor(private readonly removeCheckoutService: RemoveCheckoutService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Checkout)
  async removeCheckout(
    @Args('input') data: RemoveCheckoutInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCheckoutService.execute(data);
    return response;
  }
}
