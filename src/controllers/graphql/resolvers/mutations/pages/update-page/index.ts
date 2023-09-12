import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdatePageInput } from '@/controllers/graphql/inputs/pages/update-page.input';
import { Page } from '@/controllers/graphql/types/page';
import { UpdatePageService } from '@/services/pages/update-page';

@Resolver(() => Page)
export class UpdatePageResolver {
  constructor(private readonly updatePageService: UpdatePageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Page)
  async updatePage(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdatePageInput
  ) {
    const response = await this.updatePageService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
