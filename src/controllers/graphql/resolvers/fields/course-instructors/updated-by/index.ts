import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { CourseInstructor } from '@/controllers/graphql/types/course-instructor';
import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => CourseInstructor)
export class CourseInstructorUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() courseInstructor: CourseInstructorModel) {
    return this.findAccountByIdService.execute(courseInstructor.updatedBy);
  }
}
