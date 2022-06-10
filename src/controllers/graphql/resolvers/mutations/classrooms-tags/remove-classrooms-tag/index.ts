import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveClassroomsTagInput } from '@/controllers/graphql/inputs/classrooms-tags/remove-classrooms-tag.input';
import { ClassroomsTag } from '@/controllers/graphql/types/classrooms-tag';
import { RemoveClassroomsTagService } from '@/services/classrooms-tags/remove-classrooms-tag';

@Resolver(() => ClassroomsTag)
export class RemoveClassroomsTagResolver {
  constructor(
    private readonly removeClassroomsTagService: RemoveClassroomsTagService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ClassroomsTag)
  async removeClassroomsTag(@Args('input') data: RemoveClassroomsTagInput) {
    const response = await this.removeClassroomsTagService.execute(data);
    return response;
  }
}
