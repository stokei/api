import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateFileInput } from '@/controllers/graphql/inputs/files/create-file.input';
import { File } from '@/controllers/graphql/types/file';
import { CreateFileService } from '@/services/files/create-file';

@Resolver(() => File)
export class CreateFileResolver {
  constructor(private readonly createFileService: CreateFileService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => File)
  async createFile(@Args('input') data: CreateFileInput) {
    const response = await this.createFileService.execute(data);
    return response;
  }
}
