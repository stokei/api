import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorInstructorResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account)
  instructor(@Parent() classroomInstructor: ClassroomInstructorModel) {
    return (
      classroomInstructor.instructor &&
      this.accountsLoader.findByIds.load(classroomInstructor.instructor)
    );
  }
}
