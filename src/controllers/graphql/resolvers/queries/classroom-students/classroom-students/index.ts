import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomStudentsInput,
  WhereDataFindAllClassroomStudentsInput
} from '@/controllers/graphql/inputs/classroom-students/find-all-classroom-students.input';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { ClassroomStudents } from '@/controllers/graphql/types/classroom-students';
import { FindAllClassroomStudentsService } from '@/services/classroom-students/find-all-classroom-students';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentsResolver {
  constructor(
    private readonly findAllClassroomStudentsService: FindAllClassroomStudentsService
  ) {}

  @Query(() => ClassroomStudents)
  async classroomStudents(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomStudentsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomStudentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomStudentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomStudentsInput
  ) {
    return await this.findAllClassroomStudentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
