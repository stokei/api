import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveModuleInput } from '@/controllers/graphql/inputs/modules/remove-module.input';
import { Module } from '@/controllers/graphql/types/module';
import { RemoveModuleService } from '@/services/modules/remove-module';

@Resolver(() => Module)
export class RemoveModuleResolver {
  constructor(private readonly removeModuleService: RemoveModuleService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Module)
  async removeModule(
    @Args('input') data: RemoveModuleInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeModuleService.execute(data);
    return response;
  }
}
