import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateFileInput } from '@/controllers/graphql/inputs/files/update-file.input';
import { File } from '@/controllers/graphql/types/file';
import { UpdateFileService } from '@/services/files/update-file';

@Resolver(() => File)
export class UpdateFileResolver {
  constructor(private readonly updateFileService: UpdateFileService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => File)
  async updateFile(
    @Args('input') data: UpdateFileInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateFileService.execute(data);
    return response;
  }
}
