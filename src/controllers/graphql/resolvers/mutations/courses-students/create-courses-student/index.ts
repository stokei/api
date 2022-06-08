import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateCoursesStudentInput } from '@/controllers/graphql/inputs/courses-students/create-courses-student.input';
import { CoursesStudent } from '@/controllers/graphql/types/courses-student';
import { CreateCoursesStudentService } from '@/services/courses-students/create-courses-student';

@Resolver(() => CoursesStudent)
export class CreateCoursesStudentResolver {
  constructor(
    private readonly createCoursesStudentService: CreateCoursesStudentService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CoursesStudent)
  async createCoursesStudent(
    @Args('input') data: CreateCoursesStudentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCoursesStudentService.execute(data);
    return response;
  }
}
