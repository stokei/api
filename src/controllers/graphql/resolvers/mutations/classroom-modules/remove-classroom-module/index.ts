import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveClassroomModuleInput } from '@/controllers/graphql/inputs/classroom-modules/remove-classroom-module.input';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { RemoveClassroomModuleService } from '@/services/classroom-modules/remove-classroom-module';

@Resolver(() => ClassroomModule)
export class RemoveClassroomModuleResolver {
  constructor(
    private readonly removeClassroomModuleService: RemoveClassroomModuleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomModule)
  async removeClassroomModule(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveClassroomModuleInput
  ) {
    const response = await this.removeClassroomModuleService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
