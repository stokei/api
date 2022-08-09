import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ClassroomModel } from '@/models/classroom.model';

@Resolver(() => Classroom)
export class ClassroomCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() classroom: ClassroomModel) {
    return (
      classroom.updatedBy &&
      this.accountsLoader.findByIds.load(classroom.createdBy)
    );
  }
}