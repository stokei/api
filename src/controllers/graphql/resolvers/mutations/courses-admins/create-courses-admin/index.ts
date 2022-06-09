import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateCoursesAdminInput } from '@/controllers/graphql/inputs/courses-admins/create-courses-admin.input';
import { CoursesAdmin } from '@/controllers/graphql/types/courses-admin';
import { CreateCoursesAdminService } from '@/services/courses-admins/create-courses-admin';

@Resolver(() => CoursesAdmin)
export class CreateCoursesAdminResolver {
  constructor(
    private readonly createCoursesAdminService: CreateCoursesAdminService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesAdmin)
  async createCoursesAdmin(
    @Args('input') data: CreateCoursesAdminInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCoursesAdminService.execute(data);
    return response;
  }
}
