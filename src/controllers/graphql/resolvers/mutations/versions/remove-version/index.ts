import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveVersionInput } from '@/controllers/graphql/inputs/versions/remove-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { RemoveVersionService } from '@/services/versions/remove-version';

@Resolver(() => Version)
export class RemoveVersionResolver {
  constructor(private readonly removeVersionService: RemoveVersionService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Version)
  async removeVersion(@Args('input') data: RemoveVersionInput) {
    const response = await this.removeVersionService.execute(data);
    return response;
  }
}
