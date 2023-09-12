import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePageInput } from '@/controllers/graphql/inputs/pages/create-page.input';
import { Page } from '@/controllers/graphql/types/page';
import { CreatePageService } from '@/services/pages/create-page';

@Resolver(() => Page)
export class CreatePageResolver {
  constructor(private readonly createPageService: CreatePageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Page)
  async createPage(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreatePageInput
  ) {
    const response = await this.createPageService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
