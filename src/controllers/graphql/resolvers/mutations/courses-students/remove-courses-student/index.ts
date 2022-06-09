import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCoursesStudentInput } from '@/controllers/graphql/inputs/courses-students/remove-courses-student.input';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import { RemoveCoursesStudentService } from '@/services/courses-students/remove-courses-student';

@Resolver(() => CoursesStudent)
export class RemoveCoursesStudentResolver {
  constructor(
    private readonly removeCoursesStudentService: RemoveCoursesStudentService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesStudent)
  async removeCoursesStudent(
    @Args('input') data: RemoveCoursesStudentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCoursesStudentService.execute(data);
    return response;
  }
}
