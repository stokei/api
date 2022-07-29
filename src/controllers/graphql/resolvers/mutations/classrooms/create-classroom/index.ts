import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateClassroomInput } from '@/controllers/graphql/inputs/classrooms/create-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { CreateClassroomService } from '@/services/classrooms/create-classroom';

@Resolver(() => Classroom)
export class CreateClassroomResolver {
  constructor(
    private readonly createClassroomService: CreateClassroomService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Classroom)
  async createClassroom(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateClassroomInput
  ) {
    const response = await this.createClassroomService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
