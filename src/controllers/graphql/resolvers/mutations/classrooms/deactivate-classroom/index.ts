import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { DeactivateClassroomInput } from '@/controllers/graphql/inputs/classrooms/deactivate-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { DeactivateClassroomService } from '@/services/classrooms/deactivate-classroom';

@Resolver(() => Classroom)
export class DeactivateClassroomResolver {
  constructor(
    private readonly deactivateClassroomService: DeactivateClassroomService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Classroom)
  async deactivateClassroom(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: DeactivateClassroomInput
  ) {
    const response = await this.deactivateClassroomService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
