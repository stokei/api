import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateClassroomInstructorInput } from '@/controllers/graphql/inputs/classroom-instructors/create-classroom-instructor.input';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { CreateClassroomInstructorService } from '@/services/classroom-instructors/create-classroom-instructor';

@Resolver(() => ClassroomInstructor)
export class CreateClassroomInstructorResolver {
  constructor(
    private readonly createClassroomInstructorService: CreateClassroomInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomInstructor)
  async createClassroomInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateClassroomInstructorInput
  ) {
    const response = await this.createClassroomInstructorService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
