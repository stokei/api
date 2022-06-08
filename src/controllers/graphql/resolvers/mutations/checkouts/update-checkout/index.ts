import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateCheckoutInput } from '@/controllers/graphql/inputs/checkouts/update-checkout.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { UpdateCheckoutService } from '@/services/checkouts/update-checkout';

@Resolver(() => Checkout)
export class UpdateCheckoutResolver {
  constructor(private readonly updateCheckoutService: UpdateCheckoutService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Checkout)
  async updateCheckout(
    @Args('input') data: UpdateCheckoutInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateCheckoutService.execute(data);
    return response;
  }
}
