import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllAppInstructorsInput,
  WhereDataFindAllAppInstructorsInput
} from '@/controllers/graphql/inputs/app-instructors/find-all-app-instructors.input';
import { AppInstructor } from '@/controllers/graphql/types/app-instructor';
import { AppInstructors } from '@/controllers/graphql/types/app-instructors';
import { FindAllAppInstructorsService } from '@/services/app-instructors/find-all-app-instructors';

@Resolver(() => AppInstructor)
export class AppInstructorsResolver {
  constructor(
    private readonly findAllAppInstructorsService: FindAllAppInstructorsService
  ) {}

  @Query(() => AppInstructors)
  async appInstructors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllAppInstructorsInput,
      nullable: true
    })
    where: WhereDataFindAllAppInstructorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAppInstructorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAppInstructorsInput
  ) {
    return await this.findAllAppInstructorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
