import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveClassroomsModuleInput } from '@/controllers/graphql/inputs/classrooms-modules/remove-classrooms-module.input';
import { ClassroomsModule } from '@/controllers/graphql/types/classrooms-module';
import { RemoveClassroomsModuleService } from '@/services/classrooms-modules/remove-classrooms-module';

@Resolver(() => ClassroomsModule)
export class RemoveClassroomsModuleResolver {
  constructor(
    private readonly removeClassroomsModuleService: RemoveClassroomsModuleService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsModule)
  async removeClassroomsModule(
    @Args('input') data: RemoveClassroomsModuleInput
  ) {
    const response = await this.removeClassroomsModuleService.execute(data);
    return response;
  }
}
