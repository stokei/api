import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateModuleInput } from '@/controllers/graphql/inputs/modules/create-module.input';
import { Module } from '@/controllers/graphql/types/module';
import { CreateModuleService } from '@/services/modules/create-module';

@Resolver(() => Module)
export class CreateModuleResolver {
  constructor(private readonly createModuleService: CreateModuleService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Module)
  async createModule(
    @Args('input') data: CreateModuleInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createModuleService.execute(data);
    return response;
  }
}
