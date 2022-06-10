import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreatePageInput } from '@/controllers/graphql/inputs/pages/create-page.input';
import { Page } from '@/controllers/graphql/types/page';
import { CreatePageService } from '@/services/pages/create-page';

@Resolver(() => Page)
export class CreatePageResolver {
  constructor(private readonly createPageService: CreatePageService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Page)
  async createPage(@Args('input') data: CreatePageInput) {
    const response = await this.createPageService.execute(data);
    return response;
  }
}
