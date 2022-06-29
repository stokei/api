import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateClassroomsInstructorInput } from '@/controllers/graphql/inputs/classrooms-instructors/update-classrooms-instructor.input';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';
import { UpdateClassroomsInstructorService } from '@/services/classrooms-instructors/update-classrooms-instructor';

@Resolver(() => ClassroomsInstructor)
export class UpdateClassroomsInstructorResolver {
  constructor(
    private readonly updateClassroomsInstructorService: UpdateClassroomsInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsInstructor)
  async updateClassroomsInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateClassroomsInstructorInput
  ) {
    const response = await this.updateClassroomsInstructorService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
