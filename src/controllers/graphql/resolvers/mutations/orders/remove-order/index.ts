import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveOrderInput } from '@/controllers/graphql/inputs/orders/remove-order.input';
import { Order } from '@/controllers/graphql/types/order';
import { RemoveOrderService } from '@/services/orders/remove-order';

@Resolver(() => Order)
export class RemoveOrderResolver {
  constructor(private readonly removeOrderService: RemoveOrderService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Order)
  async removeOrder(
    @Args('input') data: RemoveOrderInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeOrderService.execute(data);
    return response;
  }
}
