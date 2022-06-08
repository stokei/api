import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllModulesInput,
  WhereDataFindAllModulesInput
} from '@/controllers/graphql/inputs/modules/find-all-modules.input';
import { Module } from '@/controllers/graphql/types/module';
import { Modules } from '@/controllers/graphql/types/modules';
import { FindAllModulesService } from '@/services/modules/find-all-modules';

@Resolver(() => Module)
export class ModulesResolver {
  constructor(private readonly findAllModulesService: FindAllModulesService) {}

  @Query(() => Modules)
  async modules(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllModulesInput, nullable: true })
    where: WhereDataFindAllModulesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllModulesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllModulesInput
  ) {
    return await this.findAllModulesService.execute({
      page,
      where,
      orderBy
    });
  }
}
