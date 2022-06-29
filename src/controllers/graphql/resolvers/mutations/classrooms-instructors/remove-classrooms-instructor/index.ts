import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveClassroomsInstructorInput } from '@/controllers/graphql/inputs/classrooms-instructors/remove-classrooms-instructor.input';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';
import { RemoveClassroomsInstructorService } from '@/services/classrooms-instructors/remove-classrooms-instructor';

@Resolver(() => ClassroomsInstructor)
export class RemoveClassroomsInstructorResolver {
  constructor(
    private readonly removeClassroomsInstructorService: RemoveClassroomsInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsInstructor)
  async removeClassroomsInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveClassroomsInstructorInput
  ) {
    const response = await this.removeClassroomsInstructorService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
