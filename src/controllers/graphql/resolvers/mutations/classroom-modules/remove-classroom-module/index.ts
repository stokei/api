import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveClassroomModuleInput } from '@/controllers/graphql/inputs/classroom-modules/remove-classroom-module.input';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { RemoveClassroomModuleService } from '@/services/classroom-modules/remove-classroom-module';

@Resolver(() => ClassroomModule)
export class RemoveClassroomModuleResolver {
  constructor(
    private readonly removeClassroomModuleService: RemoveClassroomModuleService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => ClassroomModule)
  async removeClassroomModule(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveClassroomModuleInput
  ) {
    const response = await this.removeClassroomModuleService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
