import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdatePageInput } from '@/controllers/graphql/inputs/pages/update-page.input';
import { Page } from '@/controllers/graphql/types/page';
import { UpdatePageService } from '@/services/pages/update-page';

@Resolver(() => Page)
export class UpdatePageResolver {
  constructor(private readonly updatePageService: UpdatePageService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Page)
  async updatePage(@Args('input') data: UpdatePageInput) {
    const response = await this.updatePageService.execute(data);
    return response;
  }
}
