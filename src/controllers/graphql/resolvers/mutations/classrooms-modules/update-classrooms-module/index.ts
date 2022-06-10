import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

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
    @Args('input') data: UpdateClassroomsModuleInput
  ) {
    const response = await this.updateClassroomsModuleService.execute(data);
    return response;
  }
}
