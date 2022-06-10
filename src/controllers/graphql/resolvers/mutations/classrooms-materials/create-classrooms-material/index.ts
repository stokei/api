import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateClassroomsMaterialInput } from '@/controllers/graphql/inputs/classrooms-materials/create-classrooms-material.input';
import { ClassroomsMaterial } from '@/controllers/graphql/types/classrooms-material';
import { CreateClassroomsMaterialService } from '@/services/classrooms-materials/create-classrooms-material';

@Resolver(() => ClassroomsMaterial)
export class CreateClassroomsMaterialResolver {
  constructor(
    private readonly createClassroomsMaterialService: CreateClassroomsMaterialService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsMaterial)
  async createClassroomsMaterial(
    @Args('input') data: CreateClassroomsMaterialInput
  ) {
    const response = await this.createClassroomsMaterialService.execute(data);
    return response;
  }
}
