import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllClassroomsMaterialsInput,
  WhereDataFindAllClassroomsMaterialsInput
} from '@/controllers/graphql/inputs/classrooms-materials/find-all-classrooms-materials.input';
import { ClassroomsMaterial } from '@/controllers/graphql/types/classrooms-material';
import { ClassroomsMaterials } from '@/controllers/graphql/types/classrooms-materials';
import { FindAllClassroomsMaterialsService } from '@/services/classrooms-materials/find-all-classrooms-materials';

@Resolver(() => ClassroomsMaterial)
export class ClassroomsMaterialsResolver {
  constructor(
    private readonly findAllClassroomsMaterialsService: FindAllClassroomsMaterialsService
  ) {}

  @Query(() => ClassroomsMaterials)
  async classroomsMaterials(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllClassroomsMaterialsInput,
      nullable: true
    })
    where: WhereDataFindAllClassroomsMaterialsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllClassroomsMaterialsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllClassroomsMaterialsInput
  ) {
    return await this.findAllClassroomsMaterialsService.execute({
      page,
      where,
      orderBy
    });
  }
}
