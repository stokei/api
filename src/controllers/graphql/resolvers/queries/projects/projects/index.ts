import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllProjectsInput,
  WhereDataFindAllProjectsInput
} from '@/controllers/graphql/inputs/projects/find-all-projects.input';
import { Project } from '@/controllers/graphql/types/project';
import { Projects } from '@/controllers/graphql/types/projects';
import { FindAllProjectsService } from '@/services/projects/find-all-projects';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly findAllProjectsService: FindAllProjectsService
  ) {}

  @Query(() => Projects)
  async projects(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllProjectsInput,
      nullable: true
    })
    where: WhereDataFindAllProjectsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllProjectsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllProjectsInput
  ) {
    return await this.findAllProjectsService.execute({
      page,
      where,
      orderBy
    });
  }
}
