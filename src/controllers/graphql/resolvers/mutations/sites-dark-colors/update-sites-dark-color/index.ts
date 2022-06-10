import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateSitesDarkColorInput } from '@/controllers/graphql/inputs/sites-dark-colors/update-sites-dark-color.input';
import { SitesDarkColor } from '@/controllers/graphql/types/sites-dark-color';
import { UpdateSitesDarkColorService } from '@/services/sites-dark-colors/update-sites-dark-color';

@Resolver(() => SitesDarkColor)
export class UpdateSitesDarkColorResolver {
  constructor(
    private readonly updateSitesDarkColorService: UpdateSitesDarkColorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => SitesDarkColor)
  async updateSitesDarkColor(@Args('input') data: UpdateSitesDarkColorInput) {
    const response = await this.updateSitesDarkColorService.execute(data);
    return response;
  }
}
