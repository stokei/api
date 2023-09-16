import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { PublishVersionInput } from '@/controllers/graphql/inputs/versions/publish-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { PublishVersionService } from '@/services/versions/publish-version';

@Resolver(() => Version)
export class PublishVersionResolver {
  constructor(private readonly publishVersionService: PublishVersionService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Version)
  async publishVersion(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: PublishVersionInput
  ) {
    const response = await this.publishVersionService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
