import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Resolver(() => CourseInstructor)
export class CourseInstructorUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() courseInstructor: CourseInstructorModel) {
    return (
      courseInstructor.updatedBy &&
      this.accountsLoader.findByIds.load(courseInstructor.updatedBy)
    );
  }
}
