import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { ClassroomStudentModel } from '@/models/classroom-student.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => ClassroomStudent)
export class ClassroomStudentUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() classroomStudent: ClassroomStudentModel) {
    return this.findAccountByIdService.execute(classroomStudent.updatedBy);
  }
}
