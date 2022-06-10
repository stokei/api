import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveClassroomsMaterialInput } from '@/controllers/graphql/inputs/classrooms-materials/remove-classrooms-material.input';
import { ClassroomsMaterial } from '@/controllers/graphql/types/classrooms-material';
import { RemoveClassroomsMaterialService } from '@/services/classrooms-materials/remove-classrooms-material';

@Resolver(() => ClassroomsMaterial)
export class RemoveClassroomsMaterialResolver {
  constructor(
    private readonly removeClassroomsMaterialService: RemoveClassroomsMaterialService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsMaterial)
  async removeClassroomsMaterial(
    @Args('input') data: RemoveClassroomsMaterialInput
  ) {
    const response = await this.removeClassroomsMaterialService.execute(data);
    return response;
  }
}
