import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { ClassroomModuleModel } from '@/models/classroom-module.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => ClassroomModule)
export class ClassroomModuleCreatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  createdBy(@Parent() classroomModule: ClassroomModuleModel) {
    return this.findAccountByIdService.execute(classroomModule.createdBy);
  }
}
