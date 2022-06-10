import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveFileInput } from '@/controllers/graphql/inputs/files/remove-file.input';
import { File } from '@/controllers/graphql/types/file';
import { RemoveFileService } from '@/services/files/remove-file';

@Resolver(() => File)
export class RemoveFileResolver {
  constructor(private readonly removeFileService: RemoveFileService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => File)
  async removeFile(@Args('input') data: RemoveFileInput) {
    const response = await this.removeFileService.execute(data);
    return response;
  }
}
