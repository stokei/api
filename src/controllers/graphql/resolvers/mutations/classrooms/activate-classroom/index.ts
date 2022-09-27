import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { ActivateClassroomInput } from '@/controllers/graphql/inputs/classrooms/activate-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { ActivateClassroomService } from '@/services/classrooms/activate-classroom';

@Resolver(() => Classroom)
export class ActivateClassroomResolver {
  constructor(
    private readonly activateClassroomService: ActivateClassroomService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Classroom)
  async activateClassroom(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: ActivateClassroomInput
  ) {
    const response = await this.activateClassroomService.execute({
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
