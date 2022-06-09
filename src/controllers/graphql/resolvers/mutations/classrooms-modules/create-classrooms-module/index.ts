import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateClassroomsModuleInput } from '@/controllers/graphql/inputs/classrooms-modules/create-classrooms-module.input';
import { ClassroomsModule } from '@/controllers/graphql/types/classrooms-module';
import { CreateClassroomsModuleService } from '@/services/classrooms-modules/create-classrooms-module';

@Resolver(() => ClassroomsModule)
export class CreateClassroomsModuleResolver {
  constructor(
    private readonly createClassroomsModuleService: CreateClassroomsModuleService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsModule)
  async createClassroomsModule(
    @Args('input') data: CreateClassroomsModuleInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createClassroomsModuleService.execute(data);
    return response;
  }
}
