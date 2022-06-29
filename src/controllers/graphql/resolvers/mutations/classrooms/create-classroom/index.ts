import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateClassroomInput } from '@/controllers/graphql/inputs/classrooms/create-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { CreateClassroomService } from '@/services/classrooms/create-classroom';

@Resolver(() => Classroom)
export class CreateClassroomResolver {
  constructor(
    private readonly createClassroomService: CreateClassroomService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Classroom)
  async createClassroom(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateClassroomInput
  ) {
    const response = await this.createClassroomService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
