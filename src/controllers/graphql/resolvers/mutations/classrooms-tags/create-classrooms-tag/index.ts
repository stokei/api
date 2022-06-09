import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateClassroomsTagInput } from '@/controllers/graphql/inputs/classrooms-tags/create-classrooms-tag.input';
import { ClassroomsTag } from '@/controllers/graphql/types/classrooms-tag';
import { CreateClassroomsTagService } from '@/services/classrooms-tags/create-classrooms-tag';

@Resolver(() => ClassroomsTag)
export class CreateClassroomsTagResolver {
  constructor(
    private readonly createClassroomsTagService: CreateClassroomsTagService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsTag)
  async createClassroomsTag(
    @Args('input') data: CreateClassroomsTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createClassroomsTagService.execute(data);
    return response;
  }
}
