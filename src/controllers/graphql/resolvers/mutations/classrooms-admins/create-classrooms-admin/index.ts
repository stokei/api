import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateClassroomsAdminInput } from '@/controllers/graphql/inputs/classrooms-admins/create-classrooms-admin.input';
import { ClassroomsAdmin } from '@/controllers/graphql/types/classrooms-admin';
import { CreateClassroomsAdminService } from '@/services/classrooms-admins/create-classrooms-admin';

@Resolver(() => ClassroomsAdmin)
export class CreateClassroomsAdminResolver {
  constructor(
    private readonly createClassroomsAdminService: CreateClassroomsAdminService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsAdmin)
  async createClassroomsAdmin(@Args('input') data: CreateClassroomsAdminInput) {
    const response = await this.createClassroomsAdminService.execute(data);
    return response;
  }
}
