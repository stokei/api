import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllCoursesStudentsInput,
  WhereDataFindAllCoursesStudentsInput
} from '@/controllers/graphql/inputs/courses-students/find-all-courses-students.input';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import { CoursesStudents } from '@/controllers/graphql/types/courses-students';
import { FindAllCoursesStudentsService } from '@/services/courses-students/find-all-courses-students';

@Resolver(() => CoursesStudent)
export class CoursesStudentsResolver {
  constructor(
    private readonly findAllCoursesStudentsService: FindAllCoursesStudentsService
  ) {}

  @Query(() => CoursesStudents)
  async coursesStudents(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCoursesStudentsInput,
      nullable: true
    })
    where: WhereDataFindAllCoursesStudentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCoursesStudentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCoursesStudentsInput
  ) {
    return await this.findAllCoursesStudentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
