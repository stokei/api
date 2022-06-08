import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateSiteInput } from '@/controllers/graphql/inputs/sites/update-site.input';
import { Site } from '@/controllers/graphql/types/site';
import { UpdateSiteService } from '@/services/sites/update-site';

@Resolver(() => Site)
export class UpdateSiteResolver {
  constructor(private readonly updateSiteService: UpdateSiteService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Site)
  async updateSite(
    @Args('input') data: UpdateSiteInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateSiteService.execute(data);
    return response;
  }
}
