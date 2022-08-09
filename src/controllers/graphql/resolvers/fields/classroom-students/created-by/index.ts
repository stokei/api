import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() classroomStudent: ClassroomStudentModel) {
    return (
      classroomStudent.updatedBy &&
      this.accountsLoader.findByIds.load(classroomStudent.createdBy)
    );
  }
}