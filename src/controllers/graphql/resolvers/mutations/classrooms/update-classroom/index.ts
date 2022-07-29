import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateClassroomInput } from '@/controllers/graphql/inputs/classrooms/update-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { UpdateClassroomService } from '@/services/classrooms/update-classroom';

@Resolver(() => Classroom)
export class UpdateClassroomResolver {
  constructor(
    private readonly updateClassroomService: UpdateClassroomService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Classroom)
  async updateClassroom(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateClassroomInput
  ) {
    const response = await this.updateClassroomService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
