import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateSitesLightColorInput } from '@/controllers/graphql/inputs/sites-light-colors/create-sites-light-color.input';
import { SitesLightColor } from '@/controllers/graphql/types/sites-light-color';
import { CreateSitesLightColorService } from '@/services/sites-light-colors/create-sites-light-color';

@Resolver(() => SitesLightColor)
export class CreateSitesLightColorResolver {
  constructor(
    private readonly createSitesLightColorService: CreateSitesLightColorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => SitesLightColor)
  async createSitesLightColor(
    @Args('input') data: CreateSitesLightColorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createSitesLightColorService.execute(data);
    return response;
  }
}
