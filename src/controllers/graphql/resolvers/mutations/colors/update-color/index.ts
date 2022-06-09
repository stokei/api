import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateColorInput } from '@/controllers/graphql/inputs/colors/update-color.input';
import { Color } from '@/controllers/graphql/types/color';
import { UpdateColorService } from '@/services/colors/update-color';

@Resolver(() => Color)
export class UpdateColorResolver {
  constructor(private readonly updateColorService: UpdateColorService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Color)
  async updateColor(
    @Args('input') data: UpdateColorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateColorService.execute(data);
    return response;
  }
}
