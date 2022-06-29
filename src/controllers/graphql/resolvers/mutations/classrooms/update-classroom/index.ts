import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateClassroomInput } from '@/controllers/graphql/inputs/classrooms/update-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { UpdateClassroomService } from '@/services/classrooms/update-classroom';

@Resolver(() => Classroom)
export class UpdateClassroomResolver {
  constructor(
    private readonly updateClassroomService: UpdateClassroomService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Classroom)
  async updateClassroom(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateClassroomInput
  ) {
    const response = await this.updateClassroomService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
