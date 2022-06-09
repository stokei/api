import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveClassroomsEnrollmentInput } from '@/controllers/graphql/inputs/classrooms-enrollments/remove-classrooms-enrollment.input';
import { ClassroomsEnrollment } from '@/controllers/graphql/types/classrooms-enrollment';
import { RemoveClassroomsEnrollmentService } from '@/services/classrooms-enrollments/remove-classrooms-enrollment';

@Resolver(() => ClassroomsEnrollment)
export class RemoveClassroomsEnrollmentResolver {
  constructor(
    private readonly removeClassroomsEnrollmentService: RemoveClassroomsEnrollmentService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsEnrollment)
  async removeClassroomsEnrollment(
    @Args('input') data: RemoveClassroomsEnrollmentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeClassroomsEnrollmentService.execute(data);
    return response;
  }
}
