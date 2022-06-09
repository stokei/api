import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateCoursesStudentInput } from '@/controllers/graphql/inputs/courses-students/update-courses-student.input';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import { UpdateCoursesStudentService } from '@/services/courses-students/update-courses-student';

@Resolver(() => CoursesStudent)
export class UpdateCoursesStudentResolver {
  constructor(
    private readonly updateCoursesStudentService: UpdateCoursesStudentService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesStudent)
  async updateCoursesStudent(
    @Args('input') data: UpdateCoursesStudentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateCoursesStudentService.execute(data);
    return response;
  }
}
