import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllClassroomsInput,
  WhereDataFindAllClassroomsInput
} from '@/controllers/graphql/inputs/classrooms/find-all-classrooms.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { Classrooms } from '@/controllers/graphql/types/classrooms';
import { FindAllClassroomsService } from '@/services/classrooms/find-all-classrooms';

@Resolver(() => Classroom)
export class ClassroomsResolver {
  constructor(
    private readonly findAllClassroomsService: FindAllClassroomsService
  ) {}

  @Query(() => Classrooms)
  async classrooms(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsInput
  ) {
    return await this.findAllClassroomsService.execute({
      page,
      where,
      orderBy
    });
  }
}
