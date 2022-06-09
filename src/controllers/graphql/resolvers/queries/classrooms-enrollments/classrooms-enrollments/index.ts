import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomsEnrollmentsInput,
  WhereDataFindAllClassroomsEnrollmentsInput
} from '@/controllers/graphql/inputs/classrooms-enrollments/find-all-classrooms-enrollments.input';
import { ClassroomsEnrollment } from '@/controllers/graphql/types/classrooms-enrollment';
import { ClassroomsEnrollments } from '@/controllers/graphql/types/classrooms-enrollments';
import { FindAllClassroomsEnrollmentsService } from '@/services/classrooms-enrollments/find-all-classrooms-enrollments';

@Resolver(() => ClassroomsEnrollment)
export class ClassroomsEnrollmentsResolver {
  constructor(
    private readonly findAllClassroomsEnrollmentsService: FindAllClassroomsEnrollmentsService
  ) {}

  @Query(() => ClassroomsEnrollments)
  async classroomsEnrollments(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsEnrollmentsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsEnrollmentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsEnrollmentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsEnrollmentsInput
  ) {
    return await this.findAllClassroomsEnrollmentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
