import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveClassroomInput } from '@/controllers/graphql/inputs/classrooms/remove-classroom.input';
import { Classroom } from '@/controllers/graphql/types/classroom';
import { RemoveClassroomService } from '@/services/classrooms/remove-classroom';

@Resolver(() => Classroom)
export class RemoveClassroomResolver {
  constructor(
    private readonly removeClassroomService: RemoveClassroomService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Classroom)
  async removeClassroom(@Args('input') data: RemoveClassroomInput) {
    const response = await this.removeClassroomService.execute(data);
    return response;
  }
}
