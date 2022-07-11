import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomModulesInput,
  WhereDataFindAllClassroomModulesInput
} from '@/controllers/graphql/inputs/classroom-module s/find-all-classroom-module s.input';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module ';
import { ClassroomModules } from '@/controllers/graphql/types/classroom-module s';
import { FindAllClassroomModulesService } from '@/services/classroom-module s/find-all-classroom-module s';

@Resolver(() => ClassroomModule)
export class ClassroomModulesResolver {
  constructor(
    private readonly findAllClassroomModulesService: FindAllClassroomModulesService
  ) {}

  @Query(() => ClassroomModules)
  async classroomModules(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomModulesInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomModulesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomModulesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomModulesInput
  ) {
    return await this.findAllClassroomModulesService.execute({
      page,
      where,
      orderBy
    });
  }
}
