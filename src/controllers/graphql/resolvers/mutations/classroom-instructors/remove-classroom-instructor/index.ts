import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveClassroomInstructorInput } from '@/controllers/graphql/inputs/classroom-instructors/remove-classroom-instructor.input';
import { ClassroomInstructor } from '@/controllers/graphql/types/classroom-instructor';
import { RemoveClassroomInstructorService } from '@/services/classroom-instructors/remove-classroom-instructor';

@Resolver(() => ClassroomInstructor)
export class RemoveClassroomInstructorResolver {
  constructor(
    private readonly removeClassroomInstructorService: RemoveClassroomInstructorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => ClassroomInstructor)
  async removeClassroomInstructor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveClassroomInstructorInput
  ) {
    const response = await this.removeClassroomInstructorService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
