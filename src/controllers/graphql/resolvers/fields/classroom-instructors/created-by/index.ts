import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() classroomInstructor: ClassroomInstructorModel) {
    return (
      classroomInstructor.updatedBy &&
      this.accountsLoader.findByIds.load(classroomInstructor.createdBy)
    );
  }
}
