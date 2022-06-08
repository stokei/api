import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllCoursesInput,
  WhereDataFindAllCoursesInput
} from '@/controllers/graphql/inputs/courses/find-all-courses.input';
import { Course } from '@/controllers/graphql/types/course';
import { Courses } from '@/controllers/graphql/types/courses';
import { FindAllCoursesService } from '@/services/courses/find-all-courses';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly findAllCoursesService: FindAllCoursesService) {}

  @Query(() => Courses)
  async courses(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllCoursesInput, nullable: true })
    where: WhereDataFindAllCoursesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCoursesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCoursesInput
  ) {
    return await this.findAllCoursesService.execute({
      page,
      where,
      orderBy
    });
  }
}
