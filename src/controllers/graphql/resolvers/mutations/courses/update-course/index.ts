import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateCourseInput } from '@/controllers/graphql/inputs/courses/update-course.input';
import { Course } from '@/controllers/graphql/types/course';
import { UpdateCourseService } from '@/services/courses/update-course';

@Resolver(() => Course)
export class UpdateCourseResolver {
  constructor(private readonly updateCourseService: UpdateCourseService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Course)
  async updateCourse(
    @Args('input') data: UpdateCourseInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateCourseService.execute(data);
    return response;
  }
}
