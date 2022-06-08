import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateOrdersItemInput } from '@/controllers/graphql/inputs/orders-items/create-orders-item.input';
import { OrdersItem } from '@/controllers/graphql/types/orders-item';
import { CreateOrdersItemService } from '@/services/orders-items/create-orders-item';

@Resolver(() => OrdersItem)
export class CreateOrdersItemResolver {
  constructor(
    private readonly createOrdersItemService: CreateOrdersItemService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => OrdersItem)
  async createOrdersItem(
    @Args('input') data: CreateOrdersItemInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createOrdersItemService.execute(data);
    return response;
  }
}
