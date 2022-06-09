import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCoursesAdminInput } from '@/controllers/graphql/inputs/courses-admins/remove-courses-admin.input';
import { CoursesAdmin } from '@/controllers/graphql/types/courses-admin';
import { RemoveCoursesAdminService } from '@/services/courses-admins/remove-courses-admin';

@Resolver(() => CoursesAdmin)
export class RemoveCoursesAdminResolver {
  constructor(
    private readonly removeCoursesAdminService: RemoveCoursesAdminService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesAdmin)
  async removeCoursesAdmin(
    @Args('input') data: RemoveCoursesAdminInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCoursesAdminService.execute(data);
    return response;
  }
}
