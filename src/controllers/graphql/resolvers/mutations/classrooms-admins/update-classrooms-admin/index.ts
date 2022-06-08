import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateClassroomsAdminInput } from '@/controllers/graphql/inputs/classrooms-admins/update-classrooms-admin.input';
import { ClassroomsAdmin } from '@/controllers/graphql/types/classrooms-admin';
import { UpdateClassroomsAdminService } from '@/services/classrooms-admins/update-classrooms-admin';

@Resolver(() => ClassroomsAdmin)
export class UpdateClassroomsAdminResolver {
  constructor(
    private readonly updateClassroomsAdminService: UpdateClassroomsAdminService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsAdmin)
  async updateClassroomsAdmin(
    @Args('input') data: UpdateClassroomsAdminInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateClassroomsAdminService.execute(data);
    return response;
  }
}
