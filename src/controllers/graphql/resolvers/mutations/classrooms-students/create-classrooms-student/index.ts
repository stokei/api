import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateClassroomsStudentInput } from '@/controllers/graphql/inputs/classrooms-students/create-classrooms-student.input';
import { ClassroomsStudent } from '@/controllers/graphql/types/classrooms-student';
import { CreateClassroomsStudentService } from '@/services/classrooms-students/create-classrooms-student';

@Resolver(() => ClassroomsStudent)
export class CreateClassroomsStudentResolver {
  constructor(
    private readonly createClassroomsStudentService: CreateClassroomsStudentService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ClassroomsStudent)
  async createClassroomsStudent(
    @Args('input') data: CreateClassroomsStudentInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createClassroomsStudentService.execute(data);
    return response;
  }
}
