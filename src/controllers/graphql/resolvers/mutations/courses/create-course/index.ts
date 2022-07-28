import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateCourseInput } from '@/controllers/graphql/inputs/courses/create-course.input';
import { Course } from '@/controllers/graphql/types/course';
import { CreateCourseService } from '@/services/courses/create-course';

@Resolver(() => Course)
export class CreateCourseResolver {
  constructor(private readonly createCourseService: CreateCourseService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Course)
  async createCourse(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: CreateCourseInput
  ) {
    const response = await this.createCourseService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
