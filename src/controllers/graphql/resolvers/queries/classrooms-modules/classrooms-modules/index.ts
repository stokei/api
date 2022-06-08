import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllClassroomsModulesInput,
  WhereDataFindAllClassroomsModulesInput
} from '@/controllers/graphql/inputs/classrooms-modules/find-all-classrooms-modules.input';
import { ClassroomsModule } from '@/controllers/graphql/types/classrooms-module';
import { ClassroomsModules } from '@/controllers/graphql/types/classrooms-modules';
import { FindAllClassroomsModulesService } from '@/services/classrooms-modules/find-all-classrooms-modules';

@Resolver(() => ClassroomsModule)
export class ClassroomsModulesResolver {
  constructor(
    private readonly findAllClassroomsModulesService: FindAllClassroomsModulesService
  ) {}

  @Query(() => ClassroomsModules)
  async classroomsModules(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsModulesInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsModulesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsModulesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsModulesInput
  ) {
    return await this.findAllClassroomsModulesService.execute({
      page,
      where,
      orderBy
    });
  }
}
