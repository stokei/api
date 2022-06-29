import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateClassroomsModuleInput } from '@/controllers/graphql/inputs/classrooms-modules/update-classrooms-module.input';
import { ClassroomsModule } from '@/controllers/graphql/types/classrooms-module';
import { UpdateClassroomsModuleService } from '@/services/classrooms-modules/update-classrooms-module';

@Resolver(() => ClassroomsModule)
export class UpdateClassroomsModuleResolver {
  constructor(
    private readonly updateClassroomsModuleService: UpdateClassroomsModuleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsModule)
  async updateClassroomsModule(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateClassroomsModuleInput
  ) {
    const response = await this.updateClassroomsModuleService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
