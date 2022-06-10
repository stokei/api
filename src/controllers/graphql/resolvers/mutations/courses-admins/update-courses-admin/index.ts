import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateCoursesAdminInput } from '@/controllers/graphql/inputs/courses-admins/update-courses-admin.input';
import { CoursesAdmin } from '@/controllers/graphql/types/courses-admin';
import { UpdateCoursesAdminService } from '@/services/courses-admins/update-courses-admin';

@Resolver(() => CoursesAdmin)
export class UpdateCoursesAdminResolver {
  constructor(
    private readonly updateCoursesAdminService: UpdateCoursesAdminService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CoursesAdmin)
  async updateCoursesAdmin(@Args('input') data: UpdateCoursesAdminInput) {
    const response = await this.updateCoursesAdminService.execute(data);
    return response;
  }
}
