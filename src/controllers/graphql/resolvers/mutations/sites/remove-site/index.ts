import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveSiteInput } from '@/controllers/graphql/inputs/sites/remove-site.input';
import { Site } from '@/controllers/graphql/types/site';
import { RemoveSiteService } from '@/services/sites/remove-site';

@Resolver(() => Site)
export class RemoveSiteResolver {
  constructor(private readonly removeSiteService: RemoveSiteService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Site)
  async removeSite(
    @Args('input') data: RemoveSiteInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeSiteService.execute(data);
    return response;
  }
}
