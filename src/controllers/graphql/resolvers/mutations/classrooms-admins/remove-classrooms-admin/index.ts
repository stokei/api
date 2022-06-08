import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveClassroomsAdminInput } from '@/controllers/graphql/inputs/classrooms-admins/remove-classrooms-admin.input';
import { ClassroomsAdmin } from '@/controllers/graphql/types/classrooms-admin';
import { RemoveClassroomsAdminService } from '@/services/classrooms-admins/remove-classrooms-admin';

@Resolver(() => ClassroomsAdmin)
export class RemoveClassroomsAdminResolver {
  constructor(
    private readonly removeClassroomsAdminService: RemoveClassroomsAdminService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsAdmin)
  async removeClassroomsAdmin(
    @Args('input') data: RemoveClassroomsAdminInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeClassroomsAdminService.execute(data);
    return response;
  }
}
