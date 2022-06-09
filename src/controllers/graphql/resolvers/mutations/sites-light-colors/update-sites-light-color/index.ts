import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateSitesLightColorInput } from '@/controllers/graphql/inputs/sites-light-colors/update-sites-light-color.input';
import { SitesLightColor } from '@/controllers/graphql/types/sites-light-color';
import { UpdateSitesLightColorService } from '@/services/sites-light-colors/update-sites-light-color';

@Resolver(() => SitesLightColor)
export class UpdateSitesLightColorResolver {
  constructor(
    private readonly updateSitesLightColorService: UpdateSitesLightColorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => SitesLightColor)
  async updateSitesLightColor(
    @Args('input') data: UpdateSitesLightColorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateSitesLightColorService.execute(data);
    return response;
  }
}
