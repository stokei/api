import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => CourseStudent)
export class CourseStudentUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() courseStudent: CourseStudentModel) {
    return this.findAccountByIdService.execute(courseStudent.updatedBy);
  }
}
