import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { AppInstructor } from '@/controllers/graphql/types/app-instructor';
import { AppInstructorModel } from '@/models/app-instructor.model';

@Resolver(() => AppInstructor)
export class AppInstructorInstructorResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  instructor(@Parent() appInstructor: AppInstructorModel) {
    return (
      appInstructor.instructor &&
      this.accountsLoader.findByIds.load(appInstructor.instructor)
    );
  }
}
