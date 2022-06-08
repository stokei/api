import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveSitesDarkColorInput } from '@/controllers/graphql/inputs/sites-dark-colors/remove-sites-dark-color.input';
import { SitesDarkColor } from '@/controllers/graphql/types/sites-dark-color';
import { RemoveSitesDarkColorService } from '@/services/sites-dark-colors/remove-sites-dark-color';

@Resolver(() => SitesDarkColor)
export class RemoveSitesDarkColorResolver {
  constructor(
    private readonly removeSitesDarkColorService: RemoveSitesDarkColorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => SitesDarkColor)
  async removeSitesDarkColor(
    @Args('input') data: RemoveSitesDarkColorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeSitesDarkColorService.execute(data);
    return response;
  }
}
