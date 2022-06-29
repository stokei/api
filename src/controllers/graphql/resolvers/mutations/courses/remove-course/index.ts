import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveCourseInput } from '@/controllers/graphql/inputs/courses/remove-course.input';
import { Course } from '@/controllers/graphql/types/course';
import { RemoveCourseService } from '@/services/courses/remove-course';

@Resolver(() => Course)
export class RemoveCourseResolver {
  constructor(private readonly removeCourseService: RemoveCourseService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Course)
  async removeCourse(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveCourseInput
  ) {
    const response = await this.removeCourseService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
