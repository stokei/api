import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomsTagsInput,
  WhereDataFindAllClassroomsTagsInput
} from '@/controllers/graphql/inputs/classrooms-tags/find-all-classrooms-tags.input';
import { ClassroomsTag } from '@/controllers/graphql/types/classrooms-tag';
import { ClassroomsTags } from '@/controllers/graphql/types/classrooms-tags';
import { FindAllClassroomsTagsService } from '@/services/classrooms-tags/find-all-classrooms-tags';

@Resolver(() => ClassroomsTag)
export class ClassroomsTagsResolver {
  constructor(
    private readonly findAllClassroomsTagsService: FindAllClassroomsTagsService
  ) {}

  @Query(() => ClassroomsTags)
  async classroomsTags(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsTagsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsTagsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsTagsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsTagsInput
  ) {
    return await this.findAllClassroomsTagsService.execute({
      page,
      where,
      orderBy
    });
  }
}
