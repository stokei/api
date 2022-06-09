import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateClassroomsTagInput } from '@/controllers/graphql/inputs/classrooms-tags/update-classrooms-tag.input';
import { ClassroomsTag } from '@/controllers/graphql/types/classrooms-tag';
import { UpdateClassroomsTagService } from '@/services/classrooms-tags/update-classrooms-tag';

@Resolver(() => ClassroomsTag)
export class UpdateClassroomsTagResolver {
  constructor(
    private readonly updateClassroomsTagService: UpdateClassroomsTagService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsTag)
  async updateClassroomsTag(
    @Args('input') data: UpdateClassroomsTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateClassroomsTagService.execute(data);
    return response;
  }
}
