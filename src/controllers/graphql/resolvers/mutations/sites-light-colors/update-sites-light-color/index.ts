import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateSitesLightColorInput } from '@/controllers/graphql/inputs/sites-light-colors/update-sites-light-color.input';
import { SitesLightColor } from '@/controllers/graphql/types/sites-light-color';
import { UpdateSitesLightColorService } from '@/services/sites-light-colors/update-sites-light-color';

@Resolver(() => SitesLightColor)
export class UpdateSitesLightColorResolver {
  constructor(
    private readonly updateSitesLightColorService: UpdateSitesLightColorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => SitesLightColor)
  async updateSitesLightColor(@Args('input') data: UpdateSitesLightColorInput) {
    const response = await this.updateSitesLightColorService.execute(data);
    return response;
  }
}
