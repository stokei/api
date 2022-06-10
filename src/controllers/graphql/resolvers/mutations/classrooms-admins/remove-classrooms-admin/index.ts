import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveClassroomsAdminInput } from '@/controllers/graphql/inputs/classrooms-admins/remove-classrooms-admin.input';
import { ClassroomsAdmin } from '@/controllers/graphql/types/classrooms-admin';
import { RemoveClassroomsAdminService } from '@/services/classrooms-admins/remove-classrooms-admin';

@Resolver(() => ClassroomsAdmin)
export class RemoveClassroomsAdminResolver {
  constructor(
    private readonly removeClassroomsAdminService: RemoveClassroomsAdminService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsAdmin)
  async removeClassroomsAdmin(@Args('input') data: RemoveClassroomsAdminInput) {
    const response = await this.removeClassroomsAdminService.execute(data);
    return response;
  }
}
