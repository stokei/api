import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateColorInput } from '@/controllers/graphql/inputs/colors/create-color.input';
import { Color } from '@/controllers/graphql/types/color';
import { CreateColorService } from '@/services/colors/create-color';

@Resolver(() => Color)
export class CreateColorResolver {
  constructor(private readonly createColorService: CreateColorService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Color)
  async createColor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: CreateColorInput
  ) {
    const response = await this.createColorService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
