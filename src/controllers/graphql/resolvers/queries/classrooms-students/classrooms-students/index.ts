import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllClassroomsStudentsInput,
  WhereDataFindAllClassroomsStudentsInput
} from '@/controllers/graphql/inputs/classrooms-students/find-all-classrooms-students.input';
import { ClassroomsStudent } from '@/controllers/graphql/types/classrooms-student';
import { ClassroomsStudents } from '@/controllers/graphql/types/classrooms-students';
import { FindAllClassroomsStudentsService } from '@/services/classrooms-students/find-all-classrooms-students';

@Resolver(() => ClassroomsStudent)
export class ClassroomsStudentsResolver {
  constructor(
    private readonly findAllClassroomsStudentsService: FindAllClassroomsStudentsService
  ) {}

  @Query(() => ClassroomsStudents)
  async classroomsStudents(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsStudentsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsStudentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsStudentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsStudentsInput
  ) {
    return await this.findAllClassroomsStudentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
