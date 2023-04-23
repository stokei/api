import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateOrUpdateColorInput } from '@/controllers/graphql/inputs/colors/create-or-update-color.input';
import { Color } from '@/controllers/graphql/types/color';
import { CreateOrUpdateColorService } from '@/services/colors/create-or-update-color';

@Resolver(() => Color)
export class CreateOrUpdateColorResolver {
  constructor(
    private readonly createColorService: CreateOrUpdateColorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Color)
  async createOrUpdateColor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateOrUpdateColorInput
  ) {
    const response = await this.createColorService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
