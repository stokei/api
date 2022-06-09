import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateCoursesAdminInput } from '@/controllers/graphql/inputs/courses-admins/update-courses-admin.input';
import { CoursesAdmin } from '@/controllers/graphql/types/courses-admin';
import { UpdateCoursesAdminService } from '@/services/courses-admins/update-courses-admin';

@Resolver(() => CoursesAdmin)
export class UpdateCoursesAdminResolver {
  constructor(
    private readonly updateCoursesAdminService: UpdateCoursesAdminService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesAdmin)
  async updateCoursesAdmin(
    @Args('input') data: UpdateCoursesAdminInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateCoursesAdminService.execute(data);
    return response;
  }
}
