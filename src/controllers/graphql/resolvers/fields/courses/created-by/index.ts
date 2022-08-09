import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Course } from '@/controllers/graphql/types/course';
import { CourseModel } from '@/models/course.model';

@Resolver(() => Course)
export class CourseCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() course: CourseModel) {
    return (
      course.createdBy && this.accountsLoader.findByIds.load(course.createdBy)
    );
  }
}
