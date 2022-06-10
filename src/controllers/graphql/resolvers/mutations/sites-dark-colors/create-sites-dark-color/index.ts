import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateSitesDarkColorInput } from '@/controllers/graphql/inputs/sites-dark-colors/create-sites-dark-color.input';
import { SitesDarkColor } from '@/controllers/graphql/types/sites-dark-color';
import { CreateSitesDarkColorService } from '@/services/sites-dark-colors/create-sites-dark-color';

@Resolver(() => SitesDarkColor)
export class CreateSitesDarkColorResolver {
  constructor(
    private readonly createSitesDarkColorService: CreateSitesDarkColorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => SitesDarkColor)
  async createSitesDarkColor(@Args('input') data: CreateSitesDarkColorInput) {
    const response = await this.createSitesDarkColorService.execute(data);
    return response;
  }
}
