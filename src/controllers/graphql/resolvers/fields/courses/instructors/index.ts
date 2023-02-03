import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllAccountsInput } from '@/controllers/graphql/inputs/accounts/find-all-accounts.input';
import { Course } from '@/controllers/graphql/types/course';
import { CourseInstructors } from '@/controllers/graphql/types/course-instructors';
import { CourseModel } from '@/models/course.model';
import { FindAllAccountsService } from '@/services/accounts/find-all-accounts';
import { FindAllCourseInstructorsService } from '@/services/course-instructors/find-all-course-instructors';

@Resolver(() => Course)
export class CourseCourseInstructorsResolver {
  constructor(
    private readonly findAllCourseInstructorsService: FindAllCourseInstructorsService,
    private readonly findAllAccountsService: FindAllAccountsService
  ) {}

  @ResolveField(() => CourseInstructors, { nullable: true })
  async instructors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAccountsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAccountsInput,
    @Parent() course: CourseModel
  ) {
    const instructors = await this.findAllCourseInstructorsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          course: {
            equals: course.id
          }
        }
      }
    });

    const accountIds = instructors?.items
      ?.map((intructor) => intructor.instructor)
      .filter(Boolean);

    const accounts = await this.findAllAccountsService.execute({
      where: {
        AND: {
          ids: accountIds
        }
      }
    });

    const instructorsItems = accounts?.items?.map((account) => {
      const instructor = instructors?.items.find(
        (currentInstructor) => currentInstructor.instructor === account.id
      );
      return instructor;
    });
    return {
      ...instructors,
      items: instructorsItems
    };
  }
}
