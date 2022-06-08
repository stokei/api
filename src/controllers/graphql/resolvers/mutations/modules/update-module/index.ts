import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateModuleInput } from '@/controllers/graphql/inputs/modules/update-module.input';
import { Module } from '@/controllers/graphql/types/module';
import { UpdateModuleService } from '@/services/modules/update-module';

@Resolver(() => Module)
export class UpdateModuleResolver {
  constructor(private readonly updateModuleService: UpdateModuleService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Module)
  async updateModule(
    @Args('input') data: UpdateModuleInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateModuleService.execute(data);
    return response;
  }
}
