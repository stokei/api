import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Resolver(() => ClassroomModule)
export class ClassroomModuleCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() classroomModule: ClassroomModuleModel) {
    return (
      classroomModule.updatedBy &&
      this.accountsLoader.findByIds.load(classroomModule.createdBy)
    );
  }
}
