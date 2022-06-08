import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateCourseInput } from '@/controllers/graphql/inputs/courses/create-course.input';
import { Course } from '@/controllers/graphql/types/course';
import { CreateCourseService } from '@/services/courses/create-course';

@Resolver(() => Course)
export class CreateCourseResolver {
  constructor(private readonly createCourseService: CreateCourseService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Course)
  async createCourse(
    @Args('input') data: CreateCourseInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCourseService.execute(data);
    return response;
  }
}
