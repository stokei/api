import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveSitesLightColorInput } from '@/controllers/graphql/inputs/sites-light-colors/remove-sites-light-color.input';
import { SitesLightColor } from '@/controllers/graphql/types/sites-light-color';
import { RemoveSitesLightColorService } from '@/services/sites-light-colors/remove-sites-light-color';

@Resolver(() => SitesLightColor)
export class RemoveSitesLightColorResolver {
  constructor(
    private readonly removeSitesLightColorService: RemoveSitesLightColorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => SitesLightColor)
  async removeSitesLightColor(
    @Args('input') data: RemoveSitesLightColorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeSitesLightColorService.execute(data);
    return response;
  }
}
