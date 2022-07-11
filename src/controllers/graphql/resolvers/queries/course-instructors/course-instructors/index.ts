import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCourseInstructorsInput,
  WhereDataFindAllCourseInstructorsInput
} from '@/controllers/graphql/inputs/course-instructors/find-all-course-instructors.input';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CourseInstructors } from '@/controllers/graphql/types/course-instructors';
import { FindAllCourseInstructorsService } from '@/services/course-instructors/find-all-course-instructors';

@Resolver(() => CourseInstructor)
export class CourseInstructorsResolver {
  constructor(
    private readonly findAllCourseInstructorsService: FindAllCourseInstructorsService
  ) {}

  @Query(() => CourseInstructors)
  async courseInstructors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCourseInstructorsInput,
      nullable: true
    })
    where: WhereDataFindAllCourseInstructorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCourseInstructorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCourseInstructorsInput
  ) {
    return await this.findAllCourseInstructorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
