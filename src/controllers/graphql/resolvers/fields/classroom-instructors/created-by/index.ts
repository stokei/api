import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => ClassroomInstructor)
export class ClassroomInstructorCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() classroomInstructor: ClassroomInstructorModel) {
    return this.findAccountByIdService.execute(classroomInstructor.createdBy);
  }
}
