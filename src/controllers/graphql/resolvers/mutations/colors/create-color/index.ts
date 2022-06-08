import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateColorInput } from '@/controllers/graphql/inputs/colors/create-color.input';
import { Color } from '@/controllers/graphql/types/color';
import { CreateColorService } from '@/services/colors/create-color';

@Resolver(() => Color)
export class CreateColorResolver {
  constructor(private readonly createColorService: CreateColorService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Color)
  async createColor(
    @Args('input') data: CreateColorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createColorService.execute(data);
    return response;
  }
}
