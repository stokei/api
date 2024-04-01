import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateVersionInput } from '@/controllers/graphql/inputs/versions/update-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { UpdateVersionService } from '@/services/versions/update-version';

@Resolver(() => Version)
export class UpdateVersionResolver {
  constructor(private readonly updateVersionService: UpdateVersionService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Version)
  async updateVersion(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateVersionInput
  ) {
    const response = await this.updateVersionService.execute({
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
