import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCoursesAdminsInput,
  WhereDataFindAllCoursesAdminsInput
} from '@/controllers/graphql/inputs/courses-admins/find-all-courses-admins.input';
import { CoursesAdmin } from '@/controllers/graphql/types/courses-admin';
import { CoursesAdmins } from '@/controllers/graphql/types/courses-admins';
import { FindAllCoursesAdminsService } from '@/services/courses-admins/find-all-courses-admins';

@Resolver(() => CoursesAdmin)
export class CoursesAdminsResolver {
  constructor(
    private readonly findAllCoursesAdminsService: FindAllCoursesAdminsService
  ) {}

  @Query(() => CoursesAdmins)
  async coursesAdmins(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCoursesAdminsInput,
      nullable: true
    })
    where: WhereDataFindAllCoursesAdminsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCoursesAdminsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCoursesAdminsInput
  ) {
    return await this.findAllCoursesAdminsService.execute({
      page,
      where,
      orderBy
    });
  }
}
