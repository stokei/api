import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateVersionInput } from '@/controllers/graphql/inputs/versions/create-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { CreateVersionService } from '@/services/versions/create-version';

@Resolver(() => Version)
export class CreateVersionResolver {
  constructor(private readonly createVersionService: CreateVersionService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Version)
  async createVersion(@Args('input') data: CreateVersionInput) {
    const response = await this.createVersionService.execute(data);
    return response;
  }
}
