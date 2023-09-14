import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllComponentsInput,
  WhereDataFindAllComponentsInput
} from '@/controllers/graphql/inputs/components/find-all-components.input';
import { Component } from '@/controllers/graphql/types/component';
import { Components } from '@/controllers/graphql/types/component';
import { FindAllComponentsService } from '@/services/components/find-all-components';

@Resolver(() => Component)
export class ComponentsResolver {
  constructor(
    private readonly findAllComponentsService: FindAllComponentsService
  ) {}

  @Query(() => Components)
  async components(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllComponentsInput,
      nullable: true
    })
    where: WhereDataFindAllComponentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllComponentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllComponentsInput
  ) {
    return await this.findAllComponentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
