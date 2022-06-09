import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCoursesInstructorsInput,
  WhereDataFindAllCoursesInstructorsInput
} from '@/controllers/graphql/inputs/courses-instructors/find-all-courses-instructors.input';
import { CoursesInstructor } from '@/controllers/graphql/types/courses-instructor';
import { CoursesInstructors } from '@/controllers/graphql/types/courses-instructors';
import { FindAllCoursesInstructorsService } from '@/services/courses-instructors/find-all-courses-instructors';

@Resolver(() => CoursesInstructor)
export class CoursesInstructorsResolver {
  constructor(
    private readonly findAllCoursesInstructorsService: FindAllCoursesInstructorsService
  ) {}

  @Query(() => CoursesInstructors)
  async coursesInstructors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCoursesInstructorsInput,
      nullable: true
    })
    where: WhereDataFindAllCoursesInstructorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCoursesInstructorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCoursesInstructorsInput
  ) {
    return await this.findAllCoursesInstructorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
