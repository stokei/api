import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllProjectsPlansInput,
  WhereDataFindAllProjectsPlansInput
} from '@/controllers/graphql/inputs/projects-plans/find-all-projects-plans.input';
import { ProjectsPlan } from '@/controllers/graphql/types/projects-plan';
import { ProjectsPlans } from '@/controllers/graphql/types/projects-plans';
import { FindAllProjectsPlansService } from '@/services/projects-plans/find-all-projects-plans';

@Resolver(() => ProjectsPlan)
export class ProjectsPlansResolver {
  constructor(
    private readonly findAllProjectsPlansService: FindAllProjectsPlansService
  ) {}

  @Query(() => ProjectsPlans)
  async projectsPlans(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllProjectsPlansInput,
      nullable: true
    })
    where: WhereDataFindAllProjectsPlansInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllProjectsPlansInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllProjectsPlansInput
  ) {
    return await this.findAllProjectsPlansService.execute({
      page,
      where,
      orderBy
    });
  }
}
