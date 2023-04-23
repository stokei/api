import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudentModel } from '@/models/course-student.model';

@Resolver(() => CourseStudent)
export class CourseStudentCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() courseStudent: CourseStudentModel) {
    return (
      courseStudent.updatedBy &&
      this.accountsLoader.findByIds.load(courseStudent.createdBy)
    );
  }
}
