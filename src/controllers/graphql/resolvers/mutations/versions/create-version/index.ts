import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateVersionInput } from '@/controllers/graphql/inputs/versions/create-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { CreateVersionService } from '@/services/versions/create-version';

@Resolver(() => Version)
export class CreateVersionResolver {
  constructor(private readonly createVersionService: CreateVersionService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Version)
  async createVersion(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateVersionInput
  ) {
    const response = await this.createVersionService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
