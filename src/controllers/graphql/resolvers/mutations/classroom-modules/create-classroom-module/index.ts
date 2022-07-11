import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateClassroomModuleInput } from '@/controllers/graphql/inputs/classroom-module s/create-classroom-module .input';
import { ClassroomModule } from '@/controllers/graphql/types/classroom-module ';
import { CreateClassroomModuleService } from '@/services/classroom-module s/create-classroom-module ';

@Resolver(() => ClassroomModule)
export class CreateClassroomModuleResolver {
  constructor(
    private readonly createClassroomModuleService: CreateClassroomModuleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomModule)
  async createClassroomModule(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateClassroomModuleInput
  ) {
    const response = await this.createClassroomModuleService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
