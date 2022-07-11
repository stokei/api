import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomInstructorsInput,
  WhereDataFindAllClassroomInstructorsInput
} from '@/controllers/graphql/inputs/classroom-instructors/find-all-classroom-instructors.input';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { ClassroomInstructors } from '@/controllers/graphql/types/classroom-instructors';
import { FindAllClassroomInstructorsService } from '@/services/classroom-instructors/find-all-classroom-instructors';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorsResolver {
  constructor(
    private readonly findAllClassroomInstructorsService: FindAllClassroomInstructorsService
  ) {}

  @Query(() => ClassroomInstructors)
  async classroomInstructors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomInstructorsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomInstructorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomInstructorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomInstructorsInput
  ) {
    return await this.findAllClassroomInstructorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
