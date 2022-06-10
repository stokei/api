import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateClassroomsEnrollmentInput } from '@/controllers/graphql/inputs/classrooms-enrollments/create-classrooms-enrollment.input';
import { ClassroomsEnrollment } from '@/controllers/graphql/types/classrooms-enrollment';
import { CreateClassroomsEnrollmentService } from '@/services/classrooms-enrollments/create-classrooms-enrollment';

@Resolver(() => ClassroomsEnrollment)
export class CreateClassroomsEnrollmentResolver {
  constructor(
    private readonly createClassroomsEnrollmentService: CreateClassroomsEnrollmentService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsEnrollment)
  async createClassroomsEnrollment(
    @Args('input') data: CreateClassroomsEnrollmentInput
  ) {
    const response = await this.createClassroomsEnrollmentService.execute(data);
    return response;
  }
}
