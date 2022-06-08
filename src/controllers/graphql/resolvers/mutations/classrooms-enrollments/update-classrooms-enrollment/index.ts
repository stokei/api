import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateClassroomsEnrollmentInput } from '@/controllers/graphql/inputs/classrooms-enrollments/update-classrooms-enrollment.input';
import { ClassroomsEnrollment } from '@/controllers/graphql/types/classrooms-enrollment';
import { UpdateClassroomsEnrollmentService } from '@/services/classrooms-enrollments/update-classrooms-enrollment';

@Resolver(() => ClassroomsEnrollment)
export class UpdateClassroomsEnrollmentResolver {
  constructor(
    private readonly updateClassroomsEnrollmentService: UpdateClassroomsEnrollmentService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsEnrollment)
  async updateClassroomsEnrollment(
    @Args('input') data: UpdateClassroomsEnrollmentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateClassroomsEnrollmentService.execute(data);
    return response;
  }
}
