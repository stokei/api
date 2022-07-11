import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateClassroomInstructorInput } from '@/controllers/graphql/inputs/classroom-instructors/update-classroom-instructor.input';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { UpdateClassroomInstructorService } from '@/services/classroom-instructors/update-classroom-instructor';

@Resolver(() => ClassroomInstructor)
export class UpdateClassroomInstructorResolver {
  constructor(
    private readonly updateClassroomInstructorService: UpdateClassroomInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomInstructor)
  async updateClassroomInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateClassroomInstructorInput
  ) {
    const response = await this.updateClassroomInstructorService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
