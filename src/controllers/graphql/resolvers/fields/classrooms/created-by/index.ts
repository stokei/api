import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ClassroomModel } from '@/models/classroom.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => Classroom)
export class ClassroomCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() classroom: ClassroomModel) {
    return this.findAccountByIdService.execute(classroom.createdBy);
  }
}
