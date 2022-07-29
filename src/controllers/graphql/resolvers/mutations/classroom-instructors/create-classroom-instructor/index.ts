import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateClassroomInstructorInput } from '@/controllers/graphql/inputs/classroom-instructors/create-classroom-instructor.input';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { CreateClassroomInstructorService } from '@/services/classroom-instructors/create-classroom-instructor';

@Resolver(() => ClassroomInstructor)
export class CreateClassroomInstructorResolver {
  constructor(
    private readonly createClassroomInstructorService: CreateClassroomInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => ClassroomInstructor)
  async createClassroomInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateClassroomInstructorInput
  ) {
    const response = await this.createClassroomInstructorService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
