import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateColorInput } from '@/controllers/graphql/inputs/colors/update-color.input';
import { Color } from '@/controllers/graphql/types/color';
import { UpdateColorService } from '@/services/colors/update-color';

@Resolver(() => Color)
export class UpdateColorResolver {
  constructor(private readonly updateColorService: UpdateColorService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Color)
  async updateColor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: UpdateColorInput
  ) {
    const response = await this.updateColorService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
