import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateSiteInput } from '@/controllers/graphql/inputs/sites/create-site.input';
import { Site } from '@/controllers/graphql/types/site';
import { CreateSiteService } from '@/services/sites/create-site';

@Resolver(() => Site)
export class CreateSiteResolver {
  constructor(private readonly createSiteService: CreateSiteService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Site)
  async createSite(@Args('input') data: CreateSiteInput) {
    const response = await this.createSiteService.execute(data);
    return response;
  }
}
