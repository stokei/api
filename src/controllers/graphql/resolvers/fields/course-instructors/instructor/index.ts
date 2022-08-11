import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Resolver(() => CourseInstructor)
export class CourseInstructorInstructorResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account)
  instructor(@Parent() courseInstructor: CourseInstructorModel) {
    return (
      courseInstructor.instructor &&
      this.accountsLoader.findByIds.load(courseInstructor.instructor)
    );
  }
}
