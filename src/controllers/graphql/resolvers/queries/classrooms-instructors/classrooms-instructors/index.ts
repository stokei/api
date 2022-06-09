import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomsInstructorsInput,
  WhereDataFindAllClassroomsInstructorsInput
} from '@/controllers/graphql/inputs/classrooms-instructors/find-all-classrooms-instructors.input';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';
import { ClassroomsInstructors } from '@/controllers/graphql/types/classrooms-instructors';
import { FindAllClassroomsInstructorsService } from '@/services/classrooms-instructors/find-all-classrooms-instructors';

@Resolver(() => ClassroomsInstructor)
export class ClassroomsInstructorsResolver {
  constructor(
    private readonly findAllClassroomsInstructorsService: FindAllClassroomsInstructorsService
  ) {}

  @Query(() => ClassroomsInstructors)
  async classroomsInstructors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsInstructorsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsInstructorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsInstructorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsInstructorsInput
  ) {
    return await this.findAllClassroomsInstructorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
