import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveColorInput } from '@/controllers/graphql/inputs/colors/remove-color.input';
import { Color } from '@/controllers/graphql/types/color';
import { RemoveColorService } from '@/services/colors/remove-color';

@Resolver(() => Color)
export class RemoveColorResolver {
  constructor(private readonly removeColorService: RemoveColorService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Color)
  async removeColor(@Args('input') data: RemoveColorInput) {
    const response = await this.removeColorService.execute(data);
    return response;
  }
}
