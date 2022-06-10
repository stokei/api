import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemovePageInput } from '@/controllers/graphql/inputs/pages/remove-page.input';
import { Page } from '@/controllers/graphql/types/page';
import { RemovePageService } from '@/services/pages/remove-page';

@Resolver(() => Page)
export class RemovePageResolver {
  constructor(private readonly removePageService: RemovePageService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Page)
  async removePage(@Args('input') data: RemovePageInput) {
    const response = await this.removePageService.execute(data);
    return response;
  }
}
