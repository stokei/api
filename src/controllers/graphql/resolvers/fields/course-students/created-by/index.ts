import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { CourseStudent } from '@/controllers/graphql/types/course-student';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => CourseStudent)
export class CourseStudentCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() courseStudent: CourseStudentModel) {
    return this.findAccountByIdService.execute(courseStudent.createdBy);
  }
}
