import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateClassroomsModuleInput } from '@/controllers/graphql/inputs/classrooms-modules/create-classrooms-module.input';
import { ClassroomsModule } from '@/controllers/graphql/types/classrooms-module';
import { CreateClassroomsModuleService } from '@/services/classrooms-modules/create-classrooms-module';

@Resolver(() => ClassroomsModule)
export class CreateClassroomsModuleResolver {
  constructor(
    private readonly createClassroomsModuleService: CreateClassroomsModuleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsModule)
  async createClassroomsModule(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateClassroomsModuleInput
  ) {
    const response = await this.createClassroomsModuleService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
