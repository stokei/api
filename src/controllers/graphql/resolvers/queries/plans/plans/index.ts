import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllPlansInput,
  WhereDataFindAllPlansInput
} from '@/controllers/graphql/inputs/plans/find-all-plans.input';
import { Plan } from '@/controllers/graphql/types/plan';
import { Plans } from '@/controllers/graphql/types/plans';
import { FindAllPlansService } from '@/services/plans/find-all-plans';

@Resolver(() => Plan)
export class PlansResolver {
  constructor(private readonly findAllPlansService: FindAllPlansService) {}

  @Query(() => Plans)
  async plans(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllPlansInput, nullable: true })
    where: WhereDataFindAllPlansInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPlansInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPlansInput
  ) {
    return await this.findAllPlansService.execute({
      page,
      where,
      orderBy
    });
  }
}
