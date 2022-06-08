import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllProjectsMembersInput,
  WhereDataFindAllProjectsMembersInput
} from '@/controllers/graphql/inputs/projects-members/find-all-projects-members.input';
import { ProjectsMember } from '@/controllers/graphql/types/projects-member';
import { ProjectsMembers } from '@/controllers/graphql/types/projects-members';
import { FindAllProjectsMembersService } from '@/services/projects-members/find-all-projects-members';

@Resolver(() => ProjectsMember)
export class ProjectsMembersResolver {
  constructor(
    private readonly findAllProjectsMembersService: FindAllProjectsMembersService
  ) {}

  @Query(() => ProjectsMembers)
  async projectsMembers(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllProjectsMembersInput,
      nullable: true
    })
    where: WhereDataFindAllProjectsMembersInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllProjectsMembersInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllProjectsMembersInput
  ) {
    return await this.findAllProjectsMembersService.execute({
      page,
      where,
      orderBy
    });
  }
}
