import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Course } from '@/controllers/graphql/types/course';
import { CourseModel } from '@/models/course.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Course)
export class CourseUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() course: CourseModel) {
    return this.findAccountByIdService.execute(course.updatedBy);
  }
}
