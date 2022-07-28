import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateCourseInput } from '@/controllers/graphql/inputs/courses/update-course.input';
import { Course } from '@/controllers/graphql/types/course';
import { UpdateCourseService } from '@/services/courses/update-course';

@Resolver(() => Course)
export class UpdateCourseResolver {
  constructor(private readonly updateCourseService: UpdateCourseService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Course)
  async updateCourse(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: UpdateCourseInput
  ) {
    const response = await this.updateCourseService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
