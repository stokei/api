import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemovePageInput } from '@/controllers/graphql/inputs/pages/remove-page.input';
import { Page } from '@/controllers/graphql/types/page';
import { RemovePageService } from '@/services/pages/remove-page';

@Resolver(() => Page)
export class RemovePageResolver {
  constructor(private readonly removePageService: RemovePageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Page)
  async removePage(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemovePageInput
  ) {
    const response = await this.removePageService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
