import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateClassroomsInstructorInput } from '@/controllers/graphql/inputs/classrooms-instructors/create-classrooms-instructor.input';
import { ClassroomsInstructor } from '@/controllers/graphql/types/classrooms-instructor';
import { CreateClassroomsInstructorService } from '@/services/classrooms-instructors/create-classrooms-instructor';

@Resolver(() => ClassroomsInstructor)
export class CreateClassroomsInstructorResolver {
  constructor(
    private readonly createClassroomsInstructorService: CreateClassroomsInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsInstructor)
  async createClassroomsInstructor(
    @Args('input') data: CreateClassroomsInstructorInput
  ) {
    const response = await this.createClassroomsInstructorService.execute(data);
    return response;
  }
}
