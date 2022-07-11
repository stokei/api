import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCourseStudentsInput,
  WhereDataFindAllCourseStudentsInput
} from '@/controllers/graphql/inputs/course-students/find-all-course-students.input';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudents } from '@/controllers/graphql/types/course-students';
import { FindAllCourseStudentsService } from '@/services/course-students/find-all-course-students';

@Resolver(() => CourseStudent)
export class CourseStudentsResolver {
  constructor(
    private readonly findAllCourseStudentsService: FindAllCourseStudentsService
  ) {}

  @Query(() => CourseStudents)
  async courseStudents(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCourseStudentsInput,
      nullable: true
    })
    where: WhereDataFindAllCourseStudentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCourseStudentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCourseStudentsInput
  ) {
    return await this.findAllCourseStudentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
