import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateClassroomsMaterialInput } from '@/controllers/graphql/inputs/classrooms-materials/update-classrooms-material.input';
import { ClassroomsMaterial } from '@/controllers/graphql/types/classrooms-material';
import { UpdateClassroomsMaterialService } from '@/services/classrooms-materials/update-classrooms-material';

@Resolver(() => ClassroomsMaterial)
export class UpdateClassroomsMaterialResolver {
  constructor(
    private readonly updateClassroomsMaterialService: UpdateClassroomsMaterialService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsMaterial)
  async updateClassroomsMaterial(
    @Args('input') data: UpdateClassroomsMaterialInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateClassroomsMaterialService.execute(data);
    return response;
  }
}
