import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllClassroomsPlansInput,
  WhereDataFindAllClassroomsPlansInput
} from '@/controllers/graphql/inputs/classrooms-plans/find-all-classrooms-plans.input';
import { ClassroomsPlan } from '@/controllers/graphql/types/classrooms-plan';
import { ClassroomsPlans } from '@/controllers/graphql/types/classrooms-plans';
import { FindAllClassroomsPlansService } from '@/services/classrooms-plans/find-all-classrooms-plans';

@Resolver(() => ClassroomsPlan)
export class ClassroomsPlansResolver {
  constructor(
    private readonly findAllClassroomsPlansService: FindAllClassroomsPlansService
  ) {}

  @Query(() => ClassroomsPlans)
  async classroomsPlans(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsPlansInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsPlansInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsPlansInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsPlansInput
  ) {
    return await this.findAllClassroomsPlansService.execute({
      page,
      where,
      orderBy
    });
  }
}
