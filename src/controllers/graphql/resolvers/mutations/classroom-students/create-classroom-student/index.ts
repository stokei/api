import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateClassroomStudentInput } from '@/controllers/graphql/inputs/classroom-students/create-classroom-student.input';
import { ClassroomStudent } from '@/controllers/graphql/types/classroom-student';
import { CreateClassroomStudentService } from '@/services/classroom-students/create-classroom-student';

@Resolver(() => ClassroomStudent)
export class CreateClassroomStudentResolver {
  constructor(
    private readonly createClassroomStudentService: CreateClassroomStudentService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => ClassroomStudent)
  async createClassroomStudent(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateClassroomStudentInput
  ) {
    const response = await this.createClassroomStudentService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
