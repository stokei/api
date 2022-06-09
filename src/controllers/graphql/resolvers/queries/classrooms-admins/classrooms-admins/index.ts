import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomsAdminsInput,
  WhereDataFindAllClassroomsAdminsInput
} from '@/controllers/graphql/inputs/classrooms-admins/find-all-classrooms-admins.input';
import { ClassroomsAdmin } from '@/controllers/graphql/types/classrooms-admin';
import { ClassroomsAdmins } from '@/controllers/graphql/types/classrooms-admins';
import { FindAllClassroomsAdminsService } from '@/services/classrooms-admins/find-all-classrooms-admins';

@Resolver(() => ClassroomsAdmin)
export class ClassroomsAdminsResolver {
  constructor(
    private readonly findAllClassroomsAdminsService: FindAllClassroomsAdminsService
  ) {}

  @Query(() => ClassroomsAdmins)
  async classroomsAdmins(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsAdminsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsAdminsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsAdminsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsAdminsInput
  ) {
    return await this.findAllClassroomsAdminsService.execute({
      page,
      where,
      orderBy
    });
  }
}
