import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateClassroomModuleInput } from '@/controllers/graphql/inputs/classroom-modules/update-classroom-module.input';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module';
import { UpdateClassroomModuleService } from '@/services/classroom-modules/update-classroom-module';

@Resolver(() => ClassroomModule)
export class UpdateClassroomModuleResolver {
  constructor(
    private readonly updateClassroomModuleService: UpdateClassroomModuleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomModule)
  async updateClassroomModule(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateClassroomModuleInput
  ) {
    const response = await this.updateClassroomModuleService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
