import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveCourseInput } from '@/controllers/graphql/inputs/courses/remove-course.input';
import { Course } from '@/controllers/graphql/types/course';
import { RemoveCourseService } from '@/services/courses/remove-course';

@Resolver(() => Course)
export class RemoveCourseResolver {
  constructor(private readonly removeCourseService: RemoveCourseService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Course)
  async removeCourse(@Args('input') data: RemoveCourseInput) {
    const response = await this.removeCourseService.execute(data);
    return response;
  }
}
