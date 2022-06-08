import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveClassroomsMaterialInput } from '@/controllers/graphql/inputs/classrooms-materials/remove-classrooms-material.input';
import { ClassroomsMaterial } from '@/controllers/graphql/types/classrooms-material';
import { RemoveClassroomsMaterialService } from '@/services/classrooms-materials/remove-classrooms-material';

@Resolver(() => ClassroomsMaterial)
export class RemoveClassroomsMaterialResolver {
  constructor(
    private readonly removeClassroomsMaterialService: RemoveClassroomsMaterialService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsMaterial)
  async removeClassroomsMaterial(
    @Args('input') data: RemoveClassroomsMaterialInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeClassroomsMaterialService.execute(data);
    return response;
  }
}
